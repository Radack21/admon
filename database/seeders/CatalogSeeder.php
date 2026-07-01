<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CatalogSeeder extends Seeder
{
    public function run(): void
    {
        $legacy = fn (string $table) => DB::connection('legacy')->table($table);

        $this->bulkInsert('regimenes_fiscales', $legacy('Regimen')->get()->map(fn($r) => [
            'id' => $r->id_regimen,
            'nombre' => $r->dsc_regimen,
        ]));

        $this->bulkInsert('paises', $legacy('Pais')->get()->map(fn($p) => [
            'id' => $p->id_pais,
            'nombre' => $p->dsc_pais,
        ]));

        $this->bulkInsert('estados', $legacy('Estado')->get()->map(fn($e) => [
            'id' => $e->id_estado,
            'pais_id' => $e->id_pais,
            'nombre' => $e->dsc_estado,
        ]));

        $this->bulkInsert('ciudades', $legacy('Ciudad')->get()->map(fn($c) => [
            'id' => $c->id_ciudad,
            'estado_id' => $c->id_estado,
            'nombre' => $c->dsc_ciudad,
        ]));

        $this->bulkInsert('persona_tipos', $legacy('Cliente')->get()->map(fn($c) => [
            'id' => $c->id_cliente,
            'nombre' => $c->dsc_cliente,
        ]));

        $this->bulkInsert('uso_cfdi', $legacy('Tipo_cliente')->get()->map(fn($t) => [
            'id' => $t->id_Tipo_cliente,
            'persona_tipo_id' => $t->id_cliente,
            'nombre' => $t->dsc_Tipo_cliente,
        ]));

        $this->bulkInsert('subtipos_cliente', $legacy('SubTipo_cliente')->get()->map(fn($s) => [
            'id' => $s->id_SubTipo_cliente,
            'uso_cfdi_id' => $s->id_Tipo_cliente,
            'nombre' => $s->dsc_SubTipo_cliente,
        ]));

        $this->bulkInsert('formas_juridicas', $legacy('Forma')->get()->map(fn($f) => [
            'id' => $f->id_forma,
            'nombre' => $f->dsc_forma,
        ]));

        $this->bulkInsert('ambitos', $legacy('Ambito')->get()->map(fn($a) => [
            'id' => $a->id_ambito,
            'nombre' => $a->dsc_ambito,
        ]));

        $this->bulkInsert('tamanios', $legacy('Tamanio')->get()->map(fn($t) => [
            'id' => $t->id_tamanio,
            'nombre' => $t->dsc_tamanio,
        ]));

        $this->bulkInsert('sectores', $legacy('Sector')->get()->map(fn($s) => [
            'id' => $s->id_sector,
            'nombre' => $s->dsc_sector,
        ]));

        $this->bulkInsert('clasificaciones', $legacy('Clasificacion')->get()->map(fn($c) => [
            'id' => $c->id_clasificacion,
            'nombre' => $c->dsc_clasificacion,
        ]));

        $this->bulkInsert('ramas', $legacy('Rama')->get()->map(fn($r) => [
            'id' => $r->id_rama,
            'nombre' => $r->dsc_rama,
        ]));

        $this->bulkInsert('servicios', $legacy('EmpresaServicios')->get()->map(fn($s) => [
            'id' => $s->id_empresaservicios,
            'nombre' => $s->dsc_empresaservicios,
        ]));
    }

    private function bulkInsert(string $table, $rows, int $chunkSize = 500): void
    {
        $now = now();

        foreach ($rows->chunk($chunkSize) as $chunk) {
            $data = $chunk->map(function ($row) use ($now) {
                $row['created_at'] = $now;
                $row['updated_at'] = $now;

                return $row;
            })->toArray();

            DB::table($table)->insertOrIgnore($data);
        }
    }
}
