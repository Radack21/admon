<?php

namespace App\Http\Requests\Clients;

use Illuminate\Foundation\Http\FormRequest;

class StoreClientRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $isProspect = $this->input('type') === 'prospect';

        return [
            'nombre_comercial' => 'required|string|max:500',
            'razon_social' => $isProspect ? 'nullable|string|max:500' : 'nullable|string|max:500',
            'rfc' => 'nullable|string|max:50',
            'curp' => 'nullable|string|max:50',
            'representante_legal' => 'nullable|string|max:500',
            'responsable_id' => 'nullable|exists:users,id',
            'sucursal' => 'nullable|string|max:20',
            'fuente' => $isProspect ? 'nullable|string|max:250' : 'nullable|string|max:250',

            'persona_tipo_id' => 'nullable|exists:persona_tipos,id',
            'uso_cfdi_id' => 'nullable|exists:uso_cfdi,id',
            'subtipo_cliente_id' => 'nullable|exists:subtipos_cliente,id',
            'regimen_fiscal_id' => 'nullable|exists:regimenes_fiscales,id',
            'forma_juridica_id' => 'nullable|exists:formas_juridicas,id',
            'ambito_id' => 'nullable|exists:ambitos,id',
            'tamanio_id' => 'nullable|exists:tamanios,id',
            'sector_id' => 'nullable|exists:sectores,id',
            'clasificacion_id' => 'nullable|exists:clasificaciones,id',
            'rama_id' => 'nullable|exists:ramas,id',

            'domicilio_calle' => 'nullable|string|max:500',
            'domicilio_numero' => 'nullable|string|max:30',
            'domicilio_colonia' => 'nullable|string|max:500',
            'domicilio_cp' => 'nullable|string|max:10',
            'pais_id' => 'nullable|exists:paises,id',
            'estado_id' => 'nullable|exists:estados,id',
            'ciudad_id' => 'nullable|exists:ciudades,id',

            'lada' => 'nullable|string|max:5',
            'telefono' => 'nullable|string|max:20',

            'contacto_nombre' => 'nullable|string|max:200',
            'contacto_profesion' => 'nullable|string|max:100',
            'contacto_puesto' => 'nullable|string|max:100',
            'contacto_email' => 'nullable|email|max:100',
            'contacto_lada' => 'nullable|string|max:20',
            'contacto_telefono' => 'nullable|string|max:100',
            'contacto_extension' => 'nullable|string|max:10',

            'social_networks' => 'nullable|array',
            'social_networks.web' => 'nullable|string|max:500',
            'social_networks.facebook' => 'nullable|string|max:500',
            'social_networks.twitter' => 'nullable|string|max:500',
            'social_networks.linkedin' => 'nullable|string|max:500',
            'social_networks.google' => 'nullable|string|max:500',

            'services' => 'nullable|array',
            'services.*' => 'exists:servicios,id',

            'type' => 'required|in:active,prospect,inactive',
        ];
    }

    public function attributes(): array
    {
        return [
            'nombre_comercial' => 'nombre comercial',
            'razon_social' => 'razón social',
            'rfc' => 'RFC',
            'curp' => 'CURP',
            'representante_legal' => 'representante legal',
            'responsable_id' => 'responsable',
            'sucursal' => 'sucursal',
            'fuente' => 'fuente',
            'persona_tipo_id' => 'tipo de persona',
            'uso_cfdi_id' => 'uso CFDI',
            'subtipo_cliente_id' => 'subtipo de cliente',
            'regimen_fiscal_id' => 'régimen fiscal',
            'forma_juridica_id' => 'forma jurídica',
            'ambito_id' => 'ámbito',
            'tamanio_id' => 'tamaño',
            'sector_id' => 'sector',
            'clasificacion_id' => 'clasificación',
            'rama_id' => 'rama',
            'domicilio_calle' => 'calle',
            'domicilio_numero' => 'número',
            'domicilio_colonia' => 'colonia',
            'domicilio_cp' => 'código postal',
            'pais_id' => 'país',
            'estado_id' => 'estado',
            'ciudad_id' => 'ciudad',
            'contacto_nombre' => 'nombre del contacto',
            'contacto_profesion' => 'profesión',
            'contacto_puesto' => 'cargo',
            'contacto_email' => 'correo electrónico',
            'services' => 'servicios',
        ];
    }
}
