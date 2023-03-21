<?php

namespace App\Policies;

use App\Models\Announcement;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class AnnouncementPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->can('view any announcement');
    }

    public function view(User $user, Announcement $announcement): bool
    {
        return $user->can('view announcement');
    }

    public function create(User $user): bool
    {
        return $user->can('create announcement');
    }

    public function update(User $user, Announcement $announcement): bool
    {
        return $user->can('update announcement');
    }

    public function delete(User $user, Announcement $announcement): bool
    {
        return $user->can('delete announcement');
    }
}
