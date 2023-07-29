<?php

use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
	Route::patch('task/{task}/solved', [TaskController::class, 'solved'])->name('task.solved');
	Route::patch('task/{task}/close', [TaskController::class, 'close'])->name('task.close');
	Route::patch('task/{task}/reopen', [TaskController::class, 'reopen'])->name('task.reopen');
	Route::post('task/{task}/create-progress', [TaskController::class, 'createProgress'])->name('task.createProgress');

	Route::resource('task', TaskController::class);
});
