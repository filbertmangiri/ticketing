<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;

Route::middleware('auth')->group(function () {
	Route::delete('/product/{product}/force-delete', [ProductController::class, 'forceDelete'])
		->name('product.forceDelete')->withTrashed();

	Route::patch('/product/{product}/restore', [ProductController::class, 'restore'])
		->name('product.restore')->withTrashed();

	Route::resource('product', ProductController::class)
		->except(['create', 'edit']);
});
