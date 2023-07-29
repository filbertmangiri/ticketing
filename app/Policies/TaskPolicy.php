<?php

namespace App\Policies;

use App\Models\Task;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class TaskPolicy
{
    public function viewAny(User $user): bool
    {
        if ($user->can('view assigned task')) {
            return true;
        }

        if ($user->can('create task')) {
            return true;
        }

        return $user->can('view any task');
    }

    public function view(User $user, Task $task): bool
    {
        if ($user->can('create task')) {
            return true;
        }

        if ($user->id == $task->issuer?->id) {
            return true;
        }

        if ($user->id == $task->technician?->id) {
            return true;
        }

        return false;
    }

    public function create(User $user): bool
    {
        return $user->can('create task');
    }

    public function update(User $user, Task $task): bool
    {
        if ($task->closed_at && $user->cannot('action closed task')) {
            return false;
        }

        if ($user->id == $task->issuer_id) {
            return true;
        }

        return $user->can('update task');
    }

    public function delete(User $user, Task $task): bool
    {
        return $user->can('delete task');
    }

    public function restore(User $user, Task $task): bool
    {
        return $user->can('restore task');
    }

    public function forceDelete(User $user, Task $task): bool
    {
        return $user->can('force delete task');
    }

    public function solved(User $user, Task $task): bool
    {
        if ($task->closed_at) {
            return false;
        }

        return $user->id == $task->issuer?->id && !$task->solved_at;
    }

    public function close(User $user, Task $task): bool
    {
        return $user->can('close task');
    }

    public function reopen(User $user, Task $task): bool
    {
        return $user->can('close task');
    }

    public function createProgress(User $user, Task $task): bool
    {
        if ($task->closed_at) {
            return false;
        }

        return $user->id == $task->technician_id;
    }
}
