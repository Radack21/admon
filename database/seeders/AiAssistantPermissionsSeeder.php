<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class AiAssistantPermissionsSeeder extends Seeder
{
    public function run(): void
    {
        Permission::findOrCreate('asistente-ia', 'web');
        Permission::findOrCreate('asistente-ia:aplicar', 'web');

        $admin = Role::findOrCreate('admin', 'web');
        $admin->givePermissionTo(['asistente-ia', 'asistente-ia:aplicar']);

        $this->command->info('Permisos del asistente IA creados y asignados al rol admin.');
    }
}
