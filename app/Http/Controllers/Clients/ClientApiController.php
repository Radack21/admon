<?php

namespace App\Http\Controllers\Clients;

use App\Http\Controllers\Controller;
use App\Models\Pais;
use App\Models\Estado;
use App\Models\Ciudad;
use App\Models\SubTipoCliente;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ClientApiController extends Controller
{
    public function estados(Pais $pais): JsonResponse
    {
        return response()->json($pais->estados()->orderBy('nombre')->get(['id', 'nombre']));
    }

    public function ciudades(Estado $estado): JsonResponse
    {
        return response()->json($estado->ciudades()->orderBy('nombre')->get(['id', 'nombre']));
    }

    public function subtipos(Request $request): JsonResponse
    {
        $usoCfdiId = $request->get('uso_cfdi_id');

        return response()->json(
            SubTipoCliente::where('uso_cfdi_id', $usoCfdiId)
                ->orderBy('nombre')
                ->get(['id', 'nombre'])
        );
    }

    public function catalogos(): JsonResponse
    {
        return response()->json([
            'persona_tipos' => \App\Models\PersonaTipo::orderBy('nombre')->get(['id', 'nombre']),
            'uso_cfdi' => \App\Models\UsoCfdi::with('personaTipo')->orderBy('nombre')->get(['id', 'persona_tipo_id', 'nombre']),
            'subtipos_cliente' => \App\Models\SubTipoCliente::orderBy('nombre')->get(['id', 'uso_cfdi_id', 'nombre']),
            'regimenes_fiscales' => \App\Models\RegimenFiscal::orderBy('nombre')->get(['id', 'nombre']),
            'formas_juridicas' => \App\Models\FormaJuridica::orderBy('nombre')->get(['id', 'nombre']),
            'ambitos' => \App\Models\Ambito::orderBy('nombre')->get(['id', 'nombre']),
            'tamanios' => \App\Models\Tamanio::orderBy('nombre')->get(['id', 'nombre']),
            'sectores' => \App\Models\Sector::orderBy('nombre')->get(['id', 'nombre']),
            'clasificaciones' => \App\Models\Clasificacion::orderBy('nombre')->get(['id', 'nombre']),
            'ramas' => \App\Models\Rama::orderBy('nombre')->get(['id', 'nombre']),
            'paises' => \App\Models\Pais::orderBy('nombre')->get(['id', 'nombre']),
            'usuarios' => \App\Models\User::orderBy('nombre')->get(['id', 'nombre', 'apellido_paterno']),
            'servicios' => \App\Models\Servicio::orderBy('nombre')->get(['id', 'nombre']),
        ]);
    }
}
