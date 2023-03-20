<?php

namespace App\Http\Requests\Location;

use App\Models\Location;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class StoreLocationRequest extends FormRequest
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
			'name' => ['required', 'string', 'max:255'],
			'slug' => Rule::unique(Location::class),
		];
	}

	public function attributes()
	{
		return [
			'slug' => 'name',
		];
	}
}
