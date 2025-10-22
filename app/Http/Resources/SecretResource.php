<?php

namespace App\Http\Resources;

use App\Models\Secret;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property Secret $resource
 */
class SecretResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->resource->id,
            'name' => $this->resource->name,
            'title' => $this->resource->title,
            'message' => $this->resource->message,
            'recipient' => $this->resource->recipient,
            'status' => $this->resource->status,
            'expires_at' => $this->resource->expires_at,
        ];
    }
}
