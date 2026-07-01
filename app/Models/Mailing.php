<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Mailing extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'client_id', 'asunto', 'mensaje', 'destinatarios',
        'remitente', 'afiliados', 'prospectos', 'enviado_at',
    ];

    protected function casts(): array
    {
        return [
            'afiliados' => 'boolean',
            'prospectos' => 'boolean',
            'enviado_at' => 'datetime',
        ];
    }

    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class);
    }
}
