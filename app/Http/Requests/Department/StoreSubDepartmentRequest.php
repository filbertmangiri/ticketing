<?php

namespace App\Http\Requests\Department;

use App\Models\Department\Department;
use App\Models\Department\SubDepartment;
use Illuminate\Support\Str;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreSubDepartmentRequest extends FormRequest
{
	public function authorize(): bool
	{
		return true;
	}

	public function prepareForValidation(): void
	{
		$this->merge([
			'slug' => Str::slug($this->name),
			'department_id' => $this->department['value'] ?? null,
		]);
	}

	public function rules(): array
	{
		return [
			'name' => ['required', 'string', 'max:50'],
			'slug' => Rule::unique(SubDepartment::class, 'slug')
				->where('department_id', $this->department_id),
			'description' => ['nullable', 'string', 'max:255'],
			'department_id' => [
				'required', 'integer',
				Rule::exists(Department::class, 'id'),
			],
		];
	}

	public function attributes(): array
	{
		return [
			'slug' => 'name',
			'department_id' => 'department',
		];
	}
}
