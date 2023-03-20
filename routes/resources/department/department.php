<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Department\DepartmentController;

Route::middleware('auth')->group(function () {
	Route::get('/department/{department:id}/fetch-sub-departments', [DepartmentController::class, 'fetchSubDepartments'])
		->name('department.fetchSubDepartments');

	Route::match(['GET', 'POST'], '/department/{department}', [DepartmentController::class, 'show'])
		->name('department.show');

	Route::delete('/department/{department}/force-delete', [DepartmentController::class, 'forceDelete'])
		->name('department.forceDelete')->withTrashed();

	Route::patch('/department/{department}/restore', [DepartmentController::class, 'restore'])
		->name('department.restore')->withTrashed();

	Route::resource('department', DepartmentController::class)
		->except(['create', 'edit', 'show']);
});
