<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FormaJuridica extends Model
{
    protected $table = 'formas_juridicas';

    protected $fillable = ['nombre'];
}
