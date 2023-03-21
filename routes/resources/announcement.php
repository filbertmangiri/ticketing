<?php

use App\Http\Controllers\AnnouncementController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
	Route::resource('announcement', AnnouncementController::class)
		->except(['create', 'edit']);
});
