<?php

namespace App\Http\Resources\Department;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SubDepartmentResource extends JsonResource
{
	public function toArray(Request $request): array
	{
		return [
			// ...parent::toArray($request),

			'id' => $this->id,
			'name' => $this->name,
			'slug' => $this->slug,
			'description' => $this->description,
			'department' => [
				'id' => $this->department?->id,
				'name' => $this->department?->name,
				'slug' => $this->department?->slug,
			],
			'users_count' => $this->users_count,
			'deleted_at' => $this->deleted_at,
		];
	}
}
