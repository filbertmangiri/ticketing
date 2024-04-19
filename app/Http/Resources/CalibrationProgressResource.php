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
            'description' => $this->description ?? null,
            'created_at' => $this->created_at?->format('l, d F Y - H:i:s'),
        ];
    }
}
