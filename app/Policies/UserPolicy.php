<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\Response;

class UserPolicy
{
	public function viewAny(User $user): bool
	{
		return $user->can('view any user');
	}

	public function view(User $user, User $model): bool
	{
		// If the user is viewing their own profile, they can view it
		if ($user->id == $model->id) {
			return true;
		}

		return $user->can('view user');
	}

	public function create(User $user): bool
	{
		return $user->can('create user');
	}

	public function update(User $user, User $model): bool
	{
		return $user->can('update user');
	}

	public function delete(User $user, User $model): bool
	{
		return $user->can('delete user');
	}

	public function restore(User $user, User $model): bool
	{
		return $user->can('restore user');
	}

	public function forceDelete(User $user, User $model): bool
	{
		return $user->can('force delete user');
	}
}
