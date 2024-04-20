<?php

namespace App\Http\Requests\Calibration;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class AssignCalibrationRequest extends FormRequest
{
	public function authorize(): bool
	{
		return true;
	}

	public function prepareForValidation(): void
	{
		$this->merge([
			'department_id' => $this->department['value'] ?? null,
		]);
	}

	public function rules(): array
	{
		return [
			'department_id' => ['required', Rule::exists('departments', 'id')],
			'description' => ['required', 'string', 'min:5', 'max:1000'],
		];
	}

	public function attributes()
	{
		return [
			'department_id' => 'department',
		];
	}
}
