<?php

use App\Http\Controllers\TaskCommentController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
	// Route::resource('comment', TaskCommentController::class);

	Route::post('/task-comment', [TaskCommentController::class, 'store'])
		->name('task_comment.store');

	Route::put('/task-comment/{comment}', [TaskCommentController::class, 'update'])
		->name('task_comment.update');

	Route::delete('/task-comment/{comment}', [TaskCommentController::class, 'destroy'])
		->name('task_comment.destroy');
});
