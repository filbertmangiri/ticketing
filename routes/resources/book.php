<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BookController;

Route::middleware('auth')->group(function () {
	Route::get('/book/e-book', [BookController::class, 'index'])
		->name('book.eBookList');

	Route::get('/book/manual', [BookController::class, 'index'])
		->name('book.manualList');

	Route::delete('/book/{book}/force-delete', [BookController::class, 'forceDelete'])
		->name('book.forceDelete')->withTrashed();

	Route::patch('/book/{book}/restore', [BookController::class, 'restore'])
		->name('book.restore')->withTrashed();

	Route::resource('book', BookController::class)
		->except(['create', 'edit']);
});
