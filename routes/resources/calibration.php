<?php

use App\Http\Controllers\CalibrationController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
	Route::patch('calibration/{calibration}/assign', [CalibrationController::class, 'assign'])->name('calibration.assign');
	Route::patch('calibration/{calibration}/close', [CalibrationController::class, 'close'])->name('calibration.close');
	Route::patch('calibration/{calibration}/reopen', [CalibrationController::class, 'reopen'])->name('calibration.reopen');
	Route::post('calibration/{calibration}/create-progress', [CalibrationController::class, 'createProgress'])->name('calibration.createProgress');

	Route::resource('calibration', CalibrationController::class);
});
