<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UsoCfdi extends Model
{
    protected $table = 'uso_cfdi';

    protected $fillable = ['nombre', 'persona_tipo_id'];

    public function personaTipo()
    {
        return $this->belongsTo(PersonaTipo::class);
    }

    public function subtipos()
    {
        return $this->hasMany(SubTipoCliente::class);
    }
}
