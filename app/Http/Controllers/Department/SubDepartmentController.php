<?php

namespace App\Http\Controllers\Department;

use App\Http\Controllers\Controller;
use App\Http\Requests\Department\StoreSubDepartmentRequest;
use App\Http\Requests\Department\UpdateSubDepartmentRequest;
use App\Http\Resources\Department\SubDepartmentResource;
use App\Http\Resources\UserResource;
use App\Models\Department\Department;
use App\Models\Department\SubDepartment;
use App\Models\User;
use Spatie\Permission\Models\Role;

class SubDepartmentController extends Controller
{
	public function __construct()
	{
		$this->authorizeResource(SubDepartment::class, 'subDepartment');
	}

	public function index()
	{
		$departments = fn () => Department::all();

		$builder = SubDepartment::with('department')->withCount('users')->filterWithPagination();

		$additional = SubDepartment::filterAdditional($builder);

		$subDepartments = fn () => SubDepartmentResource::collection($builder)->additional($additional);

		return inertia('SubDepartments/Index', compact('subDepartments', 'departments'));
	}

	public function store(StoreSubDepartmentRequest $request)
	{
		$validated = $request->validated();

		$department = Department::findOrFail($validated['department_id']);

		$department->subDepartments()->create($validated);
	}

	public function show(SubDepartment $subDepartment)
	{
		$subDepartment->load('department');

		$departments = fn () => Department::all();

		/* Users Datatable */

		$builder = $subDepartment->users()->with('subDepartment', 'subDepartment.department')->filterWithPagination('users');

		$additional = User::filterAdditional($builder, 'users');

		$users = fn () => UserResource::collection($builder)->additional($additional);

		$roles = fn () => Role::all();

		return inertia('SubDepartments/Show', compact('subDepartment', 'departments', 'users', 'roles'));
	}

	public function update(UpdateSubDepartmentRequest $request, SubDepartment $subDepartment)
	{
		$validated = $request->validated();

		$subDepartment->update($validated);
	}

	public function destroy(SubDepartment $subDepartment)
	{
		$subDepartment->delete();
	}

	public function restore(SubDepartment $subDepartment)
	{
		$subDepartment->restore();
	}

	public function forceDelete(SubDepartment $subDepartment)
	{
		$subDepartment->forceDelete();
	}
}
