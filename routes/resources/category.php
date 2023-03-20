<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;

Route::middleware('auth')->group(function () {
	Route::get('/category/{category:id}/fetch-products', [CategoryController::class, 'fetchProducts'])
		->name('category.fetchProducts');

	Route::match(['GET', 'POST'], '/category/{category}', [CategoryController::class, 'show'])
		->name('category.show');

	Route::delete('/category/{category}/force-delete', [CategoryController::class, 'forceDelete'])
		->name('category.forceDelete')->withTrashed();

	Route::patch('/category/{category}/restore', [CategoryController::class, 'restore'])
		->name('category.restore')->withTrashed();

	Route::resource('category', CategoryController::class)
		->except(['create', 'edit', 'show']);
});
