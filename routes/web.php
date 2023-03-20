<?php

use App\Http\Controllers\DownloadController;
use App\Http\Controllers\Pages\DashboardController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
	Route::get('/', DashboardController::class)
		->name('dashboard');

	Route::get('download', DownloadController::class)
		->name('download');
});

require __DIR__ . '/auth.php';

require __DIR__ . '/resources/index.php';
