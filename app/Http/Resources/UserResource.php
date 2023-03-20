<?php

namespace App\Http\Resources;

use App\Http\Resources\Department\DepartmentResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
	public function toArray(Request $request): array
	{
		return [
			// ...parent::toArray($request),

			'id' => $this->id,
			'name' => $this->name,
			'email' => $this->email,
			'username' => $this->username,
			'phone' => $this->phone,
			'gender' => [
				'value' => $this->gender->value,
				'label' => $this->gender->label(),
			],
			'profile_picture' => $this->getProfilePicture(),
			'department' => $this->subDepartment?->department?->only('id', 'name', 'slug'),
			'sub_department' => $this->subDepartment?->only('id', 'name', 'slug'),
			'roles' => $this->roles,
			'deleted_at' => $this->deleted_at,
		];
	}
}
