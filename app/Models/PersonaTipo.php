<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PersonaTipo extends Model
{
    protected $table = 'persona_tipos';

    protected $fillable = ['nombre'];

    public function usosCfdi()
    {
        return $this->hasMany(UsoCfdi::class);
    }
}
