<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use App\Http\Requests\User\StoreUserRequest;
use App\Http\Requests\User\UpdateUserRequest;
use App\Models\Department\Department;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
	public function __construct()
	{
		$this->authorizeResource(User::class);
	}

	public function index(Request $request)
	{
		$builder = User::with('subDepartment', 'subDepartment.department', 'roles')->filterWithPagination();

		$additional = User::filterAdditional($builder);

		$users = fn () => UserResource::collection($builder)->additional($additional);

		$departments = fn () => Department::select('id', 'name')->get();

		$roles = fn () => Role::all();

		return inertia('Users/Index', compact('users', 'departments', 'roles'));
	}

	public function store(StoreUserRequest $request)
	{
		$validated = $request->validated();

		$user = User::create($validated);

		$user->syncRoles($validated['roles']);
	}

	public function show(User $user)
	{
		return inertia('Users/Show', [
			'userResource' => new UserResource($user->load('subDepartment', 'subDepartment.department', 'roles')),
		]);
	}

	public function update(UpdateUserRequest $request, User $user)
	{
		$validated = $request->validated();

		$user->update($validated);

		$user->syncRoles($validated['roles']);
	}

	public function destroy(User $user)
	{
		$user->delete();
	}

	public function restore(User $user)
	{
		$user->restore();
	}

	public function forceDelete(User $user)
	{
		$user->forceDelete();
	}

	public function resetDefaultPassword(User $user)
	{
		$this->authorize('resetDefaultPassword', $user);

		$user->update(['password' => bcrypt('password')]);
	}
}
