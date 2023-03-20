<?php

namespace App\Policies;

use App\Models\Category;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class CategoryPolicy
{
	public function viewAny(User $user): bool
	{
		return $user->can('view any category');
	}

	public function view(User $user, Category $model): bool
	{
		return $user->can('view category');
	}

	public function create(User $user): bool
	{
		return $user->can('create category');
	}

	public function update(User $user, Category $model): bool
	{
		return $user->can('update category');
	}

	public function delete(User $user, Category $model): bool
	{
		return $user->can('delete category');
	}

	public function restore(User $user, Category $model): bool
	{
		return $user->can('restore category');
	}

	public function forceDelete(User $user, Category $model): bool
	{
		return $user->can('force delete category');
	}
}
