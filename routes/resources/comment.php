<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CommentController;

Route::middleware('auth')->group(function () {
	// Route::resource('comment', CommentController::class);

	Route::post('/comment', [CommentController::class, 'store'])
		->name('comment.store');

	Route::put('/comment/{comment}', [CommentController::class, 'update'])
		->name('comment.update');

	Route::delete('/comment/{comment}', [CommentController::class, 'destroy'])
		->name('comment.destroy');
});
