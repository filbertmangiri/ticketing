<?php

namespace App\Http\Requests\Category;

use App\Models\Category;
use Illuminate\Support\Str;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreCategoryRequest extends FormRequest
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
			'slug' => Rule::unique(Category::class),
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
