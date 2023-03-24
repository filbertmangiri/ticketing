<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BookResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'description' => $this->description,
            'url' => $this->url,
            'type' => [
                'value' => $this->type->value,
                'label' => $this->type->label(),
            ],
            'created_at' => $this->created_at?->format('l, d F Y - H:i:s'),
            'updated_at' => $this->updated_at?->format('l, d F Y - H:i:s'),
            'deleted_at' => $this->deleted_at?->format('l, d F Y - H:i:s'),
        ];
    }
}
