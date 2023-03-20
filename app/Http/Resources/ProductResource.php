<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
	public function toArray(Request $request): array
	{
		return [
			// ...parent::toArray($request),

			'id' => $this->id,
			'name' => $this->name,
			'slug' => $this->slug,
			'description' => $this->description,
			'category' => $this->category?->only('id', 'name', 'slug'),
			'deleted_at' => $this->deleted_at,
		];
	}
}
