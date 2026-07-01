<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Ciudad extends Model
{
    protected $table = 'ciudades';

    protected $fillable = ['nombre', 'estado_id'];

    public function estado(): BelongsTo
    {
        return $this->belongsTo(Estado::class);
    }
}
