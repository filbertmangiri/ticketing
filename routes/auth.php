<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\Auth\ResetPasswordController;
use App\Http\Controllers\Auth\SettingsController;

Route::middleware('auth')->group(function () {
	Route::post('/logout', LogoutController::class)
		->name('logout');

	Route::get('/account/settings', [SettingsController::class, 'edit'])
		->name('account.settings');

	Route::post('/account/settings/{user}', [SettingsController::class, 'update'])
		->name('account.update');

	Route::post('/account/settings/{user}/password', [ResetPasswordController::class, 'update'])
		->name('account.password.update');
});

Route::middleware('guest')->group(function () {
	Route::get('/login', [LoginController::class, 'create'])
		->name('login');

	Route::post('/login', [LoginController::class, 'store']);
});
