<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CategoryResource extends JsonResource
{
	public function toArray(Request $request): array
	{
		return [
			// ...parent::toArray($request),

			'id' => $this->id,
			'name' => $this->name,
			'slug' => $this->slug,
			'description' => $this->description,
			'products_count' => $this->products_count,
			'deleted_at' => $this->deleted_at,
		];
	}
}
