<?php

namespace App\Http\Resources\Department;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DepartmentResource extends JsonResource
{
	public function toArray(Request $request): array
	{
		return [
			// ...parent::toArray($request),

			'id' => $this->id,
			'name' => $this->name,
			'slug' => $this->slug,
			'description' => $this->description,
			'sub_departments_count' => $this->sub_departments_count,
			'users_count' => $this->users_count,
			'deleted_at' => $this->deleted_at,
		];
	}
}
