<?php

namespace App\Policies;

use App\Models\Location;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class LocationPolicy
{
	public function viewAny(User $user): bool
	{
		return $user->can('view any location');
	}

	public function view(User $user, Location $model): bool
	{
		return $user->can('view location');
	}

	public function create(User $user): bool
	{
		return $user->can('create location');
	}

	public function update(User $user, Location $model): bool
	{
		return $user->can('update location');
	}

	public function delete(User $user, Location $model): bool
	{
		return $user->can('delete location');
	}

	public function restore(User $user, Location $model): bool
	{
		return $user->can('restore location');
	}

	public function forceDelete(User $user, Location $model): bool
	{
		return $user->can('force delete location');
	}
}
