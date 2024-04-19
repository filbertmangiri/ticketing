<?php

use App\Http\Controllers\CalibrationCommentController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
	// Route::resource('comment', CalibrationCommentController::class);

	Route::post('/calibration-comment', [CalibrationCommentController::class, 'store'])
		->name('calibration_comment.store');

	Route::put('/calibration-comment/{comment}', [CalibrationCommentController::class, 'update'])
		->name('calibration_comment.update');

	Route::delete('/calibration-comment/{comment}', [CalibrationCommentController::class, 'destroy'])
		->name('calibration_comment.destroy');
});
