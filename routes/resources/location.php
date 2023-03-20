<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LocationController;

Route::middleware('auth')->group(function () {
	Route::delete('/location/{location}/force-delete', [LocationController::class, 'forceDelete'])
		->name('location.forceDelete')->withTrashed();

	Route::patch('/location/{location}/restore', [LocationController::class, 'restore'])
		->name('location.restore')->withTrashed();

	Route::resource('location', LocationController::class)
		->except(['create', 'edit']);
});
