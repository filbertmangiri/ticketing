<?php

namespace App\Http\Requests\Auth;

use App\Enums\Gender;
use App\Models\User;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Enum;
use Illuminate\Foundation\Http\FormRequest;

class SettingsRequest extends FormRequest
{
	public function authorize(): bool
	{
		return true;
	}

	public function rules(): array
	{
		return [
			'email' => ['required', 'string', 'email', 'max:255', Rule::unique(User::class)->ignore($this->user()->id)],
			'username' => ['required', 'string', 'username', 'max:255', Rule::unique(User::class)->ignore($this->user()->id)],
			'phone' => ['nullable', 'string', 'regex:/^([0-9\s\-\+\(\)]*)$/', Rule::unique(User::class)->ignore($this->user()->id)],
			'gender' => ['required', new Enum(Gender::class)],
			'profile_picture' => ['nullable', 'file', 'image', 'mimes:png,jpg,jpeg', 'max:3072'],
		];
	}

	public function attributes(): array
	{
		return [
			'profile_picture' => 'profile picture',
		];
	}
}
