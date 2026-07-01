<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Crypt;

class Client extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'folio',
        'type',
        'nombre_comercial',
        'razon_social',
        'rfc',
        'curp',
        'representante_legal',
        'responsable_id',
        'sucursal',
        'persona_tipo_id',
        'uso_cfdi_id',
        'subtipo_cliente_id',
        'regimen_fiscal_id',
        'forma_juridica_id',
        'ambito_id',
        'tamanio_id',
        'sector_id',
        'clasificacion_id',
        'rama_id',
        'domicilio_calle',
        'domicilio_numero',
        'domicilio_colonia',
        'domicilio_cp',
        'pais_id',
        'estado_id',
        'ciudad_id',
        'contacto_nombre',
        'contacto_profesion',
        'contacto_puesto',
        'contacto_email',
        'contacto_lada',
        'contacto_telefono',
        'contacto_extension',
        'lada',
        'telefono',
        'fuente',
        'fecha_registro',
        'observaciones',
        'unsubscribe',
        'antiguedad',
        'pago_periodo',
        'pago_despacho',
        'actualizada',
        'activo',
    ];

    protected function casts(): array
    {
        return [
            'unsubscribe' => 'boolean',
            'activo' => 'boolean',
            'fecha_registro' => 'date',
            'actualizada' => 'date',
        ];
    }

    public function responsable(): BelongsTo
    {
        return $this->belongsTo(User::class, 'responsable_id');
    }

    public function personaTipo(): BelongsTo
    {
        return $this->belongsTo(PersonaTipo::class);
    }

    public function usocfdi(): BelongsTo
    {
        return $this->belongsTo(UsoCfdi::class, 'uso_cfdi_id');
    }

    public function subtipoCliente(): BelongsTo
    {
        return $this->belongsTo(SubTipoCliente::class);
    }

    public function regimenFiscal(): BelongsTo
    {
        return $this->belongsTo(RegimenFiscal::class);
    }

    public function formaJuridica(): BelongsTo
    {
        return $this->belongsTo(FormaJuridica::class);
    }

    public function ambito(): BelongsTo
    {
        return $this->belongsTo(Ambito::class);
    }

    public function tamanio(): BelongsTo
    {
        return $this->belongsTo(Tamanio::class);
    }

    public function sector(): BelongsTo
    {
        return $this->belongsTo(Sector::class);
    }

    public function clasificacion(): BelongsTo
    {
        return $this->belongsTo(Clasificacion::class);
    }

    public function rama(): BelongsTo
    {
        return $this->belongsTo(Rama::class);
    }

    public function pais(): BelongsTo
    {
        return $this->belongsTo(Pais::class);
    }

    public function estado(): BelongsTo
    {
        return $this->belongsTo(Estado::class);
    }

    public function ciudad(): BelongsTo
    {
        return $this->belongsTo(Ciudad::class);
    }

    public function contacts(): HasMany
    {
        return $this->hasMany(ClientContact::class);
    }

    public function socialNetworks(): HasMany
    {
        return $this->hasMany(ClientSocialNetwork::class);
    }

    public function credentials(): HasMany
    {
        return $this->hasMany(ClientCredential::class);
    }

    public function metadata(): HasMany
    {
        return $this->hasMany(ClientMetadata::class);
    }

    public function services(): BelongsToMany
    {
        return $this->belongsToMany(Servicio::class, 'client_service');
    }

    public function mailings(): HasMany
    {
        return $this->hasMany(Mailing::class);
    }
}
