<?php

namespace App\Http\Requests\Department;

use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use App\Models\Department\Department;
use App\Models\Department\SubDepartment;
use Illuminate\Foundation\Http\FormRequest;

class UpdateSubDepartmentRequest extends FormRequest
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
				->where('department_id', $this->department_id)
				->ignore($this->route('subDepartment')),
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
