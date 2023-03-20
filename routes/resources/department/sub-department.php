<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Department\SubDepartmentController;

Route::middleware('auth')->prefix('/department')->group(function () {
	Route::match(['GET', 'POST'], '/sub/{subDepartment}', [SubDepartmentController::class, 'show'])
		->name('subDepartment.show');

	Route::delete('/sub/{subDepartment}/force-delete', [SubDepartmentController::class, 'forceDelete'])
		->name('subDepartment.forceDelete')->withTrashed();

	Route::patch('/sub/{subDepartment}/restore', [SubDepartmentController::class, 'restore'])
		->name('subDepartment.restore')->withTrashed();

	Route::resource('sub', SubDepartmentController::class)
		->except(['create', 'edit', 'show'])
		->parameter('sub', 'subDepartment')
		->names('subDepartment');
});
