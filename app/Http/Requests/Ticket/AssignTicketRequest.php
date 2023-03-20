<?php

namespace App\Http\Requests\Ticket;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class AssignTicketRequest extends FormRequest
{
	public function authorize(): bool
	{
		return true;
	}

	public function prepareForValidation(): void
	{
		$this->merge([
			'technician_id' => $this->technician['value'] ?? null,
		]);
	}

	public function rules(): array
	{
		return [
			'technician_id' => ['required', Rule::exists('users', 'id')],
		];
	}

	public function attributes()
	{
		return [
			'technician_id' => 'technician',
		];
	}
}
