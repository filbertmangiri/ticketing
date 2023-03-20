<?php

namespace App\Http\Requests\Auth;

use Illuminate\Support\Str;
use Illuminate\Auth\Events\Lockout;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Validation\ValidationException;

class LoginRequest extends FormRequest
{
	public function authorize(): bool
	{
		return true;
	}

	public function rules(): array
	{
		return [
			'email_or_username' => ['required', 'string'],
			'password' => ['required', 'string'],
		];
	}

	public function authenticate(): void
	{
		$this->ensureIsNotRateLimited();

		$login_type = filter_var($this->email_or_username, FILTER_VALIDATE_EMAIL) ? 'email' : 'username';

		$this->merge([
			$login_type => $this->email_or_username,
		]);

		if (!Auth::attempt($this->only($login_type, 'password'), $this->boolean('remember'))) {
			RateLimiter::hit($this->throttleKey());

			throw ValidationException::withMessages([
				'login' => trans('auth.failed'),
			]);
		}

		RateLimiter::clear($this->throttleKey());
	}

	public function ensureIsNotRateLimited(): void
	{
		if (!RateLimiter::tooManyAttempts($this->throttleKey(), 5)) {
			return;
		}

		event(new Lockout($this));

		$seconds = RateLimiter::availableIn($this->throttleKey());

		throw ValidationException::withMessages([
			'login' => trans('auth.throttle', [
				'seconds' => $seconds,
				'minutes' => ceil($seconds / 60),
			]),
		]);
	}

	public function throttleKey(): string
	{
		return Str::transliterate(Str::lower($this->input('email_or_username')) . '|' . $this->ip());
	}
}
