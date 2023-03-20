<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Providers\RouteServiceProvider;

class LoginController extends Controller
{
	public function create()
	{
		return inertia('Auth/Login');
	}

	public function store(LoginRequest $request)
	{
		$request->authenticate();

		$request->session()->regenerate();

		return redirect()->intended(RouteServiceProvider::HOME)->with('alert', [
			'type' => 'success',
			'message' => 'You are now logged in',
		]);
	}
}
