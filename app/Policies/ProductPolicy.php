<?php

namespace App\Policies;

use App\Models\Product;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class ProductPolicy
{
	public function viewAny(User $user): bool
	{
		return $user->can('view any product');
	}

	public function view(User $user, Product $model): bool
	{
		return $user->can('view product');
	}

	public function create(User $user): bool
	{
		return $user->can('create product');
	}

	public function update(User $user, Product $model): bool
	{
		return $user->can('update product');
	}

	public function delete(User $user, Product $model): bool
	{
		return $user->can('delete product');
	}

	public function restore(User $user, Product $model): bool
	{
		return $user->can('restore product');
	}

	public function forceDelete(User $user, Product $model): bool
	{
		return $user->can('force delete product');
	}
}
