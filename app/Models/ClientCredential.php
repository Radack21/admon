<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Crypt;

class ClientCredential extends Model
{
    protected $fillable = ['client_id', 'service_key', 'value'];

    protected $hidden = ['value'];

    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class);
    }

    public function setValueAttribute($value): void
    {
        $this->attributes['value'] = Crypt::encryptString($value);
    }

    public function getDecryptedValueAttribute(): string
    {
        return Crypt::decryptString($this->attributes['value']);
    }
}
