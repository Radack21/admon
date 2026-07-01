<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RegimenFiscal extends Model
{
    protected $table = 'regimenes_fiscales';

    protected $fillable = ['nombre'];
}
