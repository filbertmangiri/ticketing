<?php

namespace App\Http\Requests\Department;

use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateDepartmentRequest extends FormRequest
{
	public function authorize(): bool
	{
		return true;
	}

	public function prepareForValidation(): void
	{
		$this->merge([
			'slug' => Str::slug($this->name),
		]);
	}

	public function rules(): array
	{
		return [
			'name' => ['required', 'string', 'max:50'],
			'slug' => Rule::unique('departments')->ignore($this->route('department')),
			'description' => ['nullable', 'string', 'max:255'],
		];
	}
}
