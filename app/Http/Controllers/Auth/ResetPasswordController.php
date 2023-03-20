<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\ResetPasswordRequest;
use Illuminate\Http\Request;

class ResetPasswordController extends Controller
{
	public function update(ResetPasswordRequest $request)
	{
		$validated = $request->validated();

		$request->user()->update([
			'password' => bcrypt($validated['password']),
		]);
	}
}
