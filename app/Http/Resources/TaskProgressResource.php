<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskProgressResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            // 'id' => $this->id,
            'value' => $this->value,
            'description' => $this->description ?? null,
            'created_at' => $this->created_at?->format('l, d F Y - H:i:s'),
        ];
    }
}
