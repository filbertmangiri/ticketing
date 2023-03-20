<?php

namespace App\Http\Requests\Priority;

use App\Models\Priority;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class StorePriorityRequest extends FormRequest
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
			'name' => ['required', 'string', 'min:3', 'max:255'],
			'slug' => Rule::unique(Priority::class),
			'deadline_days' => ['nullable', 'integer', 'min:1', 'max:30'],
		];
	}

	public function attributes()
	{
		return [
			'slug' => 'name',
			'deadline_days' => 'deadline',
		];
	}
}
