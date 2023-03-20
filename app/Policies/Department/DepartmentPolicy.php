<?php

namespace App\Policies\Department;

use App\Models\Department\Department;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class DepartmentPolicy
{
	public function viewAny(User $user): bool
	{
		return $user->can('view any department');
	}

	public function view(User $user, Department $model): bool
	{
		// If the user is in a department, they can view their own department
		if ($user->subDepartment?->department?->id === $model->id) {
			return true;
		}

		return $user->can('view department');
	}

	public function create(User $user): bool
	{
		return $user->can('create department');
	}

	public function update(User $user, Department $model): bool
	{
		return $user->can('update department');
	}

	public function delete(User $user, Department $model): bool
	{
		return $user->can('delete department');
	}

	public function restore(User $user, Department $model): bool
	{
		return $user->can('restore department');
	}

	public function forceDelete(User $user, Department $model): bool
	{
		return $user->can('force delete department');
	}
}
