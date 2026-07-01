<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SubTipoCliente extends Model
{
    protected $table = 'subtipos_cliente';

    protected $fillable = ['nombre', 'uso_cfdi_id'];

    public function usocfdi()
    {
        return $this->belongsTo(UsoCfdi::class);
    }
}
