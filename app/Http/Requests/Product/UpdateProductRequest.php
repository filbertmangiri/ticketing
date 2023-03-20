<?php

namespace App\Http\Requests\Product;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateProductRequest extends FormRequest
{
	public function authorize(): bool
	{
		return true;
	}

	public function prepareForValidation(): void
	{
		$this->merge([
			'slug' => Str::slug($this->name),
			'category_id' => $this->category['value'] ?? null,
		]);
	}

	public function rules(): array
	{
		return [
			'name' => ['required', 'string', 'max:50'],
			'slug' => Rule::unique(Product::class, 'slug')
				->where('category_id', $this->category_id)
				->ignore($this->route('product')),
			'description' => ['nullable', 'string', 'max:255'],
			'category_id' => [
				'required', 'integer',
				Rule::exists(Category::class, 'id'),
			],
		];
	}

	public function attributes(): array
	{
		return [
			'slug' => 'name',
			'category_id' => 'category',
		];
	}
}
