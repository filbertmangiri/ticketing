<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CalibrationProgressResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            // 'id' => $this->id,
            'issuer' => $this->issuer?->only('id', 'username', 'name') ?? $this->issuer_name,
            'department' => $this->department?->only('id', 'name', 'slug') ?? $this->department_name,
            'description' => $this->description ?? null,
            'created_at' => $this->created_at?->format('l, d F Y - H:i:s'),
        ];
    }
}
