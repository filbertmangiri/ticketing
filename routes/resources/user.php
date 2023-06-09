<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

Route::middleware('auth')->group(function () {
	Route::post('/user/{user}/reset-default-password', [UserController::class, 'resetDefaultPassword'])
		->name('user.resetDefaultPassword');

	Route::delete('/user/{user}/force-delete', [UserController::class, 'forceDelete'])
		->name('user.forceDelete')->withTrashed();

	Route::patch('/user/{user}/restore', [UserController::class, 'restore'])
		->name('user.restore')->withTrashed();

	Route::resource('user', UserController::class)
		->except(['create', 'edit']);
});
