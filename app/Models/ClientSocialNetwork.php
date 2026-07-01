<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ClientSocialNetwork extends Model
{
    protected $fillable = ['client_id', 'platform', 'url'];

    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class);
    }
}
