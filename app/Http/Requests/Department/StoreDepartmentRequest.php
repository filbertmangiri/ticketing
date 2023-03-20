<?php

namespace App\Http\Requests\Department;

use App\Models\Department\Department;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class StoreDepartmentRequest extends FormRequest
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
			'slug' => Rule::unique(Department::class),
			'description' => ['nullable', 'string', 'max:255'],
		];
	}

	public function attributes(): array
	{
		return [
			'slug' => 'name',
		];
	}
}
