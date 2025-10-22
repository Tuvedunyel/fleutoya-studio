<?php

namespace App\Models;

use Database\Factories\SecretFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Secret extends Model
{
    /** @use HasFactory<SecretFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'title',
        'user_id',
        'message',
        'secret',
        'recipient',
        'status',
        'expires_at',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
