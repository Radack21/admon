<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ClientSeeder extends Seeder
{
    private array $metadataBatch = [];
    private array $credentialBatch = [];
    private array $socialBatch = [];
    private array $serviceBatch = [];
    private array $validIds = [];

    public function run(): void
    {
        $legacy = fn (string $table) => DB::connection('legacy')->table($table);

        // Cache valid FK IDs
        $this->validIds['users'] = DB::table('users')->pluck('id')->toArray();
        $this->validIds['paises'] = DB::table('paises')->pluck('id')->toArray();
        $this->validIds['estados'] = DB::table('estados')->pluck('id')->toArray();
        $this->validIds['ciudades'] = DB::table('ciudades')->pluck('id')->toArray();
        $this->validIds['persona_tipos'] = DB::table('persona_tipos')->pluck('id')->toArray();
        $this->validIds['uso_cfdi'] = DB::table('uso_cfdi')->pluck('id')->toArray();
        $this->validIds['subtipos_cliente'] = DB::table('subtipos_cliente')->pluck('id')->toArray();
        $this->validIds['regimenes'] = DB::table('regimenes_fiscales')->pluck('id')->toArray();
        $this->validIds['formas_juridicas'] = DB::table('formas_juridicas')->pluck('id')->toArray();
        $this->validIds['ambitos'] = DB::table('ambitos')->pluck('id')->toArray();
        $this->validIds['tamanios'] = DB::table('tamanios')->pluck('id')->toArray();
        $this->validIds['sectores'] = DB::table('sectores')->pluck('id')->toArray();
        $this->validIds['clasificaciones'] = DB::table('clasificaciones')->pluck('id')->toArray();
        $this->validIds['ramas'] = DB::table('ramas')->pluck('id')->toArray();
        $this->validIds['servicios'] = DB::table('servicios')->pluck('id')->toArray();

        $this->migrateDirectorios($legacy('Directorio')->get());
        $this->migratePotenciales($legacy('Potenciales')->get());

        $this->flushBatches();
    }

    private function validId(string $table, mixed $value): ?int
    {
        $id = (int) $value;
        if ($id <= 0) {
            return null;
        }

        return in_array($id, $this->validIds[$table] ?? []) ? $id : null;
    }

    private function migrateDirectorios($directorio): void
    {
        $rows = [];
        $maxId = (int) (DB::table('clients')->max('id') ?: 0);

        foreach ($directorio as $d) {
            $clientId = ++$maxId;
            $rows[] = [
                'id' => $clientId,
                'folio' => $d->Folio ?: 'CLI-' . $d->ID,
                'type' => $d->AltaBaja ? 'active' : 'inactive',
                'nombre_comercial' => mb_substr($d->NombreC ?: '', 0, 500),
                'razon_social' => mb_substr($d->RazonS ?: '', 0, 500),
                'rfc' => mb_substr($d->RFC ?: '', 0, 50),
                'curp' => mb_substr($d->CURP ?: '', 0, 50),
                'representante_legal' => mb_substr($d->RepresentanteL ?: '', 0, 500),
                'responsable_id' => $this->validId('users', $d->id_responsable),
                'sucursal' => mb_substr($d->Sucursal ?: '', 0, 20),
                'persona_tipo_id' => $this->validId('persona_tipos', $d->cliente),
                'uso_cfdi_id' => $this->validId('uso_cfdi', $d->Tipo_cliente),
                'subtipo_cliente_id' => $this->validId('subtipos_cliente', $d->SubTipo_cliente),
                'regimen_fiscal_id' => $this->validId('regimenes', $d->RegimenJ),
                'forma_juridica_id' => $this->validId('formas_juridicas', $d->FormaJ),
                'ambito_id' => $this->validId('ambitos', $d->AmbitoA),
                'tamanio_id' => $this->validId('tamanios', $d->Tamanio),
                'sector_id' => $this->validId('sectores', $d->Sector),
                'clasificacion_id' => $this->validId('clasificaciones', $d->Clasificacion),
                'rama_id' => $this->validId('ramas', $d->Rama),
                'domicilio_calle' => mb_substr($d->Calle ?: '', 0, 500),
                'domicilio_numero' => mb_substr($d->No ?: '', 0, 30),
                'domicilio_colonia' => mb_substr($d->Colonia ?: '', 0, 500),
                'domicilio_cp' => mb_substr($d->CP ?: '', 0, 10),
                'pais_id' => $this->validId('paises', $d->Pais),
                'estado_id' => $this->validId('estados', $d->Estado),
                'ciudad_id' => $this->validId('ciudades', $d->Ciudad),
                'contacto_nombre' => mb_substr($d->Contacto ?: '', 0, 200),
                'contacto_profesion' => mb_substr($d->Profesion ?: '', 0, 100),
                'contacto_puesto' => mb_substr($d->Puesto ?: '', 0, 100),
                'contacto_email' => mb_substr($d->Correo ?: '', 0, 100),
                'contacto_lada' => mb_substr($d->C_Lada ?: '', 0, 20),
                'contacto_telefono' => mb_substr($d->C_Tel ?: '', 0, 100),
                'contacto_extension' => mb_substr($d->C_Ext ?: '', 0, 10),
                'lada' => mb_substr($d->Lada ?: '', 0, 5),
                'telefono' => mb_substr($d->Tel ?: '', 0, 20),
                'fecha_registro' => $d->Fecha ?: null,
                'observaciones' => $d->Observaciones ?: null,
                'unsubscribe' => (bool) $d->Unsubscribe,
                'antiguedad' => $this->nullableInt($d->Antiguedad),
                'pago_periodo' => $this->nullableInt($d->PagoPeriodo),
                'pago_despacho' => $this->nullableFloat($d->PagoDespacho),
                'actualizada' => $this->parseDate($d->Actualizada),
                'activo' => (bool) $d->AltaBaja,
                'created_at' => $d->Fecha ?: now(),
                'updated_at' => now(),
            ];

            $this->collectMetadata($clientId, $d);
            $this->collectCredentials($clientId, $d);
            $this->collectSocialNetworks($clientId, $d);
            $this->collectServices($clientId, $d);

            if (count($rows) >= 50) {
                DB::table('clients')->insert($rows);
                $rows = [];
            }
        }

        if ($rows) {
            DB::table('clients')->insert($rows);
        }
    }

    private function migratePotenciales($potenciales): void
    {
        $rows = [];
        $maxId = DB::table('clients')->max('id') ?: 0;

        foreach ($potenciales as $p) {
            ++$maxId;
            $rows[] = [
                'id' => $maxId,
                'folio' => 'POT-' . $p->id_Potenciales,
                'type' => 'prospect',
                'nombre_comercial' => mb_substr($p->potenciales_NombreC ?: '', 0, 500),
                'regimen_fiscal_id' => $this->validId('regimenes', $p->potenciales_RegimenJ),
                'ambito_id' => $this->validId('ambitos', $p->potenciales_AmbitoA),
                'tamanio_id' => $this->validId('tamanios', $p->potenciales_Tamanio),
                'rama_id' => $this->validId('ramas', $p->potenciales_Rama),
                'domicilio_calle' => mb_substr($p->potenciales_Direccion ?: '', 0, 500),
                'domicilio_colonia' => mb_substr($p->potenciales_Colonia ?: '', 0, 500),
                'pais_id' => $this->validId('paises', $p->potenciales_Pais),
                'estado_id' => $this->validId('estados', $p->potenciales_Estado),
                'ciudad_id' => $this->validId('ciudades', $p->potenciales_Ciudad),
                'lada' => mb_substr($p->potenciales_Lada ?: '', 0, 5),
                'telefono' => mb_substr($p->potenciales_Tel ?: '', 0, 20),
                'contacto_nombre' => mb_substr($p->potenciales_Contacto ?: '', 0, 200),
                'contacto_puesto' => mb_substr($p->potenciales_Puesto ?: '', 0, 100),
                'contacto_email' => mb_substr($p->potenciales_Correo ?: '', 0, 100),
                'contacto_lada' => mb_substr($p->potenciales_C_Lada ?: '', 0, 20),
                'contacto_telefono' => mb_substr($p->potenciales_C_Tel ?: '', 0, 100),
                'contacto_extension' => mb_substr($p->potenciales_C_Ext ?: '', 0, 10),
                'fuente' => mb_substr($p->potenciales_Fuente ?: '', 0, 250),
                'fecha_registro' => $p->potenciales_Fecha ?: null,
                'created_at' => $p->potenciales_Fecha ?: now(),
                'updated_at' => now(),
            ];

            if (count($rows) >= 100) {
                DB::table('clients')->insert($rows);
                $rows = [];
            }
        }

        if ($rows) {
            DB::table('clients')->insert($rows);
        }
    }

    private function collectMetadata(int $clientId, object $d): void
    {
        for ($i = 1; $i <= 18; $i++) {
            $key = "Confidencial_{$i}";
            $value = $d->$key ?? null;
            if (! empty($value)) {
                $this->metadataBatch[] = [
                    'client_id' => $clientId,
                    'key' => $key,
                    'value' => mb_substr($value, 0, 250),
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
        }

    }

    private function collectCredentials(int $clientId, object $d): void
    {
        $credentials = [
            'contrasenia_sat' => $d->Confidencial_3 ?? null,
            'usuario_plataforma' => $d->Confidencial_5 ?? null,
            'password_plataforma' => $d->Confidencial_6 ?? null,
            'aws_account' => $d->Confidencial_8 ?? null,
            'bd_name' => $d->Confidencial_10 ?? null,
            'bd_pass' => $d->Confidencial_11 ?? null,
            'bd_user' => $d->Confidencial_13 ?? null,
            'root_pass' => $d->Confidencial_14 ?? null,
        ];

        foreach ($credentials as $key => $value) {
            if (! empty($value)) {
                $this->credentialBatch[] = [
                    'client_id' => $clientId,
                    'service_key' => $key,
                    'value' => $value,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
        }

    }

    private function collectSocialNetworks(int $clientId, object $d): void
    {
        $networks = [
            'web' => $d->Pagina ?? null,
            'facebook' => $d->facebook ?? null,
            'twitter' => $d->twitter ?? null,
            'linkedin' => $d->linkedin ?? null,
            'google' => $d->google ?? null,
        ];

        foreach ($networks as $platform => $url) {
            if (! empty($url) && $url !== '--' && $url !== '-') {
                $this->socialBatch[] = [
                    'client_id' => $clientId,
                    'platform' => $platform,
                    'url' => mb_substr($url, 0, 500),
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
        }

    }

    private function collectServices(int $clientId, object $d): void
    {
        $servicios = $d->Servicios ?? null;
        if (empty($servicios)) {
            return;
        }

        foreach (explode(',', (string) $servicios) as $svcId) {
            $svcId = (int) trim($svcId);
            if ($svcId > 0) {
                $this->serviceBatch[] = [
                    'client_id' => $clientId,
                    'service_id' => $svcId,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
        }

    }

    private function flushBatches(): void
    {
        if ($this->metadataBatch) {
            DB::table('client_metadata')->insert($this->metadataBatch);
        }
        if ($this->credentialBatch) {
            DB::table('client_credentials')->insert($this->credentialBatch);
        }
        if ($this->socialBatch) {
            DB::table('client_social_networks')->insert($this->socialBatch);
        }
        if ($this->serviceBatch) {
            DB::table('client_service')->insert($this->serviceBatch);
        }
    }

    private function nullableInt(mixed $value): ?int
    {
        if ($value === null || $value === '' || $value === '0') {
            return null;
        }

        return (int) $value ?: null;
    }

    private function nullableFloat(mixed $value): ?float
    {
        if ($value === null || $value === '' || $value === '0' || $value === '0.00') {
            return null;
        }

        return (float) $value ?: null;
    }

    private function parseDate(mixed $value): ?string
    {
        if (empty($value)) {
            return null;
        }

        $value = (string) $value;
        foreach (['Y-m-d', 'd/m/Y', 'm/d/Y', 'd-m-Y'] as $format) {
            $date = \DateTime::createFromFormat($format, $value);
            if ($date && $date->format($format) === $value) {
                return $date->format('Y-m-d');
            }
        }

        return null;
    }
}
