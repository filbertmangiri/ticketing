<?php

namespace App\Http\Requests\Ticket;

use App\Models\Category;
use App\Models\Location;
use App\Models\Priority;
use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreTicketRequest extends FormRequest
{
	public function authorize(): bool
	{
		return true;
	}

	public function prepareForValidation(): void
	{
		$this->merge([
			'category_id' => $this->category['value'] ?? null,
			'product_id' => $this->product['value'] ?? null,
			'location_id' => $this->location['value'] ?? null,
			'priority_id' => $this->priority['value'] ?? null,
		]);
	}

	public function rules(): array
	{
		return [
			'title' => ['required', 'string', 'min:10', 'max:255'],
			'body' => ['required', 'string', 'min:10', 'max:65535'],
			'category_id' => ['required', 'integer', Rule::exists(Category::class, 'id')],
			'product_id' => ['nullable', 'required_with:category_id', 'integer', Rule::exists(Product::class, 'id')],
			'location_id' => ['required', 'integer', Rule::exists(Location::class, 'id')],
			'priority_id' => ['required', 'integer', Rule::exists(Priority::class, 'id')],
			'attachments' => ['nullable', 'array', 'max:5'],
			'attachments.*' => ['required_with:attachments', 'nullable', 'file', 'max:512000', 'mimes:jpg,jpeg,png,webp,gif,svg,pdf,doc,docx,xls,xlsx,txt,zip,rar'],
		];
	}

	public function attributes(): array
	{
		return [
			'title' => 'subject',
			'body' => 'description',
			'category_id' => 'category',
			'product_id' => 'product',
			'location_id' => 'location',
			'priority_id' => 'priority',
			'attachments.*' => 'attachment',
		];
	}
}
