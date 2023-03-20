<?php

namespace App\Policies\Department;

use App\Models\Department\SubDepartment;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class SubDepartmentPolicy
{
	public function viewAny(User $user): bool
	{
		return $user->can('view any sub_department');
	}

	public function view(User $user, SubDepartment $model): bool
	{
		// If the user is in a sub department, they can view their own sub department
		if ($user->subDepartment?->id === $model->id) {
			return true;
		}

		return $user->can('view sub_department');
	}

	public function create(User $user): bool
	{
		return $user->can('create sub_department');
	}

	public function update(User $user, SubDepartment $model): bool
	{
		return $user->can('update sub_department');
	}

	public function delete(User $user, SubDepartment $model): bool
	{
		return $user->can('delete sub_department');
	}

	public function restore(User $user, SubDepartment $model): bool
	{
		return $user->can('restore sub_department');
	}

	public function forceDelete(User $user, SubDepartment $model): bool
	{
		return $user->can('force delete sub_department');
	}
}
