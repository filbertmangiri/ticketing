<?php

namespace App\Policies;

use App\Models\TaskComment;
use App\Models\Task;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class TaskCommentPolicy
{
    public function view(User $user, TaskComment $comment): bool
    {
        return $user->can('view task comment');
    }

    public function create(User $user): bool
    {
        return true;
    }

    public function update(User $user, TaskComment $comment, Task $task): bool
    {
        if ($task->closed_at && $user->cannot('action closed task')) {
            return false;
        }

        if ($user->id == $comment->author_id)
            return true;

        return $user->can('update task comment');
    }

    public function delete(User $user, TaskComment $comment, Task $task): bool
    {
        if ($task->closed_at && $user->cannot('action closed task')) {
            return false;
        }

        if ($user->id == $comment->author_id)
            return true;

        return $user->can('delete task comment');
    }
}
