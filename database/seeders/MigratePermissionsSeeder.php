<?php

namespace Database\Seeders;

use App\Models\Area;
use App\Models\Position;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Carbon\Carbon;

class MigratePermissionsSeeder extends Seeder
{
    /**
     * Mapping from old module controllers to new permission module names.
     */
    private array $moduleMap = [
        'c_clientes' => 'clientes',
        'Reportes' => 'reportes',
        'c_archivo' => 'archivo',
        'c_ingresos' => 'ingresos',
        'c_egresos' => 'egresos',
        'c_personal' => 'personal',
        'c_compras' => 'compras',
        'c_proveedores' => 'proveedores',
        'c_ayuda' => 'soporte',
        'c_tea' => 'tea',
        'c_sprints' => 'sprints',
        'c_requerimientos' => 'requerimientos',
    ];

    /**
     * CRUD actions in order matching the 4-bit string positions.
     */
    private array $actions = ['create', 'read', 'update', 'delete'];

    public function run(): void
    {
        // 1. Create permissions for each module + CRUD action
        $this->createPermissions();

        // 2. Create admin role with all permissions
        $this->createRoles();

        // 3. Migrate areas
        // $this->migrateAreas();

        // 4. Migrate positions (puestos)
        // $this->migratePositions();

        // 5. Migrate users
        $this->migrateUsers();

        // 6. Migrate user permissions from permisosdetallado
        $this->migrateUserPermissions();
    }

    private function createPermissions(): void
    {
        foreach ($this->moduleMap as $moduleName) {
            foreach ($this->actions as $action) {
                Permission::findOrCreate("{$moduleName}.{$action}", 'web');
            }
        }

        $this->command->info('Permissions created: ' . Permission::count());
    }

    private function createRoles(): void
    {
        $admin = Role::findOrCreate('admin', 'web');
        $admin->givePermissionTo(Permission::all());

        Role::findOrCreate('user', 'web');

        $this->command->info('Roles created: admin, user');
    }

    private function migrateAreas(): void
    {
        $oldAreas = DB::connection('legacy')->table('Area')->get();

        foreach ($oldAreas as $area) {
            Area::updateOrCreate(
                ['id' => $area->id_area],
                ['name' => $area->dsc_area]
            );
        }

        $this->command->info("Areas migrated: {$oldAreas->count()}");
    }

    private function migratePositions(): void
    {
        $oldPositions = DB::connection('legacy')->table('Puesto')->get();

        foreach ($oldPositions as $position) {
            Position::updateOrCreate(
                ['id' => $position->id_puesto],
                [
                    'name' => $position->dsc_puesto,
                    'salary' => (float) $position->Sueldo,
                ]
            );
        }

        $this->command->info("Positions migrated: {$oldPositions->count()}");
    }

    private function migrateUsers(): void
    {
        $oldUsers = DB::connection('legacy')->table('usuarios')->get();
        $count = 0;

        foreach ($oldUsers as $old) {
            $user = User::updateOrCreate(
                ['email' => $old->email],
                [
                    'nombre' => mb_convert_case(trim($old->nombre), MB_CASE_TITLE),
                    'apellido_paterno' => mb_convert_case(trim($old->apaterno), MB_CASE_TITLE),
                    'apellido_materno' => mb_convert_case(trim($old->amaterno), MB_CASE_TITLE),
                    'password' => Hash::make($old->clave),
                    'activo' => (bool) $old->Online,
                    'es_admin' => (bool) $old->AdministradorN,
                    'fecha_contratacion' => $this->parseDate($old->FechaAlta),
                    'fecha_termino' => $this->parseDate($old->FechaBaja),
                ]
            );

            // Assign admin role if flagged
            if ($old->AdministradorN) {
                $user->assignRole('admin');
            } else {
                $user->assignRole('user');
            }

            $count++;
        }

        $this->command->info("Users migrated: {$count}");
    }

    private function migrateUserPermissions(): void
    {
        $oldPermissions = DB::connection('legacy')->table('permisosdetallado')->get();
        $count = 0;

        foreach ($oldPermissions as $oldPerm) {
            // Find the user by legacy ID
            $oldUser = DB::connection('legacy')
                ->table('usuarios')
                ->where('Id', $oldPerm->Usuario)
                ->first();

            if (!$oldUser) {
                continue;
            }

            $user = User::where('email', $oldUser->email)->first();

            if (!$user) {
                continue;
            }

            // Admin users already have all permissions via role
            if ($user->is_admin) {
                $count++;
                continue;
            }

            $permissionsToAssign = [];

            foreach ($this->moduleMap as $oldColumn => $moduleName) {
                $bits = $oldPerm->{$oldColumn} ?? '0000';

                for ($i = 0; $i < 4; $i++) {
                    if (isset($bits[$i]) && $bits[$i] === '1') {
                        $permissionsToAssign[] = "{$moduleName}.{$this->actions[$i]}";
                    }
                }
            }

            if (!empty($permissionsToAssign)) {
                $user->syncPermissions($permissionsToAssign);
            }

            $count++;
        }

        $this->command->info("User permissions migrated: {$count}");
    }

    /**
     * Parse dates in various formats from legacy DB.
     * Supports: "dd/mm/yyyy", "dd/mm/yy", empty strings.
     */
    private function parseDate(?string $date): ?string
    {
        if (empty($date)) {
            return null;
        }

        $date = trim($date);

        // Try dd/mm/yyyy
        try {
            return Carbon::createFromFormat('d/m/Y', $date)->format('Y-m-d');
        } catch (\Exception $e) {
        }

        // Try dd/mm/yy
        try {
            return Carbon::createFromFormat('d/m/y', $date)->format('Y-m-d');
        } catch (\Exception $e) {
        }

        return null;
    }
}
