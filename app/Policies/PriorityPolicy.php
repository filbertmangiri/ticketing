<?php

namespace App\Policies;

use App\Models\Priority;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class PriorityPolicy
{
	public function viewAny(User $user): bool
	{
		return $user->can('view any priority');
	}

	public function view(User $user, Priority $model): bool
	{
		return $user->can('view priority');
	}

	public function create(User $user): bool
	{
		return $user->can('create priority');
	}

	public function update(User $user, Priority $model): bool
	{
		return $user->can('update priority');
	}

	public function delete(User $user, Priority $model): bool
	{
		return $user->can('delete priority');
	}

	public function restore(User $user, Priority $model): bool
	{
		return $user->can('restore priority');
	}

	public function forceDelete(User $user, Priority $model): bool
	{
		return $user->can('force delete priority');
	}
}
