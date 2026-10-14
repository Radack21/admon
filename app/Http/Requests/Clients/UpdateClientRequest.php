<?php

namespace App\Http\Requests\Clients;

class UpdateClientRequest extends StoreClientRequest
{
    // Las reglas de actualización son idénticas a las de alta.
    // Se extiende para permitir divergencias futuras sin duplicar reglas.
}
