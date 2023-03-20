<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PriorityController;

Route::middleware('auth')->group(function () {
	Route::delete('/priority/{priority}/force-delete', [PriorityController::class, 'forceDelete'])
		->name('priority.forceDelete')->withTrashed();

	Route::patch('/priority/{priority}/restore', [PriorityController::class, 'restore'])
		->name('priority.restore')->withTrashed();

	Route::resource('priority', PriorityController::class)
		->except(['create', 'edit']);
});
