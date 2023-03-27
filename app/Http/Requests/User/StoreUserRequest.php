<?php

namespace App\Http\Requests\User;

use App\Models\User;
use App\Enums\Gender;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Hash;
use App\Models\Department\Department;
use Illuminate\Validation\Rules\Enum;
use App\Models\Department\SubDepartment;
use Illuminate\Foundation\Http\FormRequest;
use Spatie\Permission\Models\Role;

class StoreUserRequest extends FormRequest
{
	public function authorize(): bool
	{
		return true;
	}

	public function prepareForValidation(): void
	{
		$this->merge([
			'department_id' => $this->department['value'] ?? null,
			'sub_department_id' => $this->sub_department['value'] ?? null,
			'roles' => $this->roles ? array_map(fn ($role) => $role['label'], $this->roles) : [],
			'password' => bcrypt('password'),
		]);
	}

	public function rules(): array
	{
		return [
			'name' => ['required', 'string', 'person_name'],
			'email' => ['required', 'string', 'email', Rule::unique(User::class)],
			'username' => ['required', 'string', 'username', Rule::unique(User::class)],
			'phone' => ['nullable', 'string', 'regex:/^([0-9\s\-\+\(\)]*)$/', Rule::unique(User::class)],
			'gender' => ['required', new Enum(Gender::class)],
			'department_id' => [
				'nullable', 'sometimes', 'integer',
				Rule::exists(Department::class, 'id'),
			],
			'sub_department_id' => [
				'nullable', 'required_with:department_id', 'integer',
				Rule::exists(SubDepartment::class, 'id'),
			],
			'roles' => ['required', 'array'],
			'roles.*' => [Rule::exists(Role::class, 'name')],
			'password' => ['required', 'string'],
		];
	}

	public function attributes(): array
	{
		return [
			'department_id' => 'department',
			'sub_department_id' => 'sub department',
		];
	}
}
