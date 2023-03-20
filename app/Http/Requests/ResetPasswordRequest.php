<?php

namespace App\Http\Requests;

use Closure;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Hash;

class ResetPasswordRequest extends FormRequest
{
	public function authorize(): bool
	{
		return true;
	}

	public function rules(): array
	{
		return [
			'current_password' => ['required', 'string', function (string $attribute, mixed $value, Closure $fail) {
				if (!Hash::check($value, $this->user()->password)) {
					$fail('The current password is wrong.');
				}
			}],
			'password' => ['required', 'string', 'min:8', 'confirmed', 'different:current_password'],
		];
	}
}
