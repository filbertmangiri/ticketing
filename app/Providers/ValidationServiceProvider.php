<?php

namespace App\Providers;

use Illuminate\Support\Facades\Validator;
use Illuminate\Support\ServiceProvider;

class ValidationServiceProvider extends ServiceProvider
{
	public function register(): void
	{
		//
	}

	public function boot(): void
	{
		Validator::extend('person_name', function ($attribute, $value) {
			return preg_match('/^[a-zA-Z\s]*$/', $value);
		});

		Validator::extend('username', function ($attribute, $value) {
			return preg_match('/^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/', $value);
		});
	}
}
