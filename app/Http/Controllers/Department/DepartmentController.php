<?php

namespace App\Http\Controllers\Department;

use App\Http\Controllers\Controller;
use App\Models\Department\Department;
use App\Http\Requests\Department\StoreDepartmentRequest;
use App\Http\Requests\Department\UpdateDepartmentRequest;
use App\Http\Resources\Department\DepartmentResource;
use App\Http\Resources\Department\SubDepartmentResource;
use App\Http\Resources\UserResource;
use App\Models\Department\SubDepartment;
use App\Models\User;

class DepartmentController extends Controller
{
	public function __construct()
	{
		$this->authorizeResource(Department::class);
	}

	public function index()
	{
		$builder = Department::withCount('subDepartments', 'users')->filterWithPagination();

		$additional = Department::filterAdditional($builder);

		$departments = fn () => DepartmentResource::collection($builder)->additional($additional);

		return inertia('Departments/Index', compact('departments'));
	}

	public function store(StoreDepartmentRequest $request)
	{
		$validated = $request->validated();

		Department::create($validated);
	}

	public function show(Department $department)
	{
		$departments = fn () => Department::all();

		/* Sub Departments Datatable */
		$builder = $department->subDepartments()->with('department')->withCount('users')->filterWithPagination('subDepartments');

		$additional = SubDepartment::filterAdditional($builder, 'subDepartments');

		$subDepartments = fn () => SubDepartmentResource::collection($builder)->additional($additional);

		/* Users Datatable */

		$builder = $department->users()->with('subDepartment', 'subDepartment.department')->filterWithPagination('users');

		$additional = User::filterAdditional($builder, 'users');

		$users = fn () => UserResource::collection($builder)->additional($additional);

		return inertia('Departments/Show', compact('department', 'departments', 'subDepartments', 'users'));
	}

	public function update(UpdateDepartmentRequest $request, Department $department)
	{
		$validated = $request->validated();

		$department->update($validated);
	}

	public function destroy(Department $department)
	{
		$department->delete();
	}

	public function restore(Department $department)
	{
		$department->restore();
	}

	public function forceDelete(Department $department)
	{
		$department->forceDelete();
	}

	public function fetchSubDepartments(Department $department)
	{
		$subDepartments = $department->subDepartments()->get();

		return response()->json($subDepartments);
	}
}
