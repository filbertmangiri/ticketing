<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PriorityResource extends JsonResource
{
	public function toArray(Request $request): array
	{
		return [
			// ...parent::toArray($request),

			'id' => $this->id,
			'name' => $this->name,
			'slug' => $this->slug,
			'deadline_days' => $this->deadline_days,
			'deleted_at' => $this->deleted_at,
		];
	}
}
