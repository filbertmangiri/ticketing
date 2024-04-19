<?php

namespace App\Policies;

use App\Models\CalibrationComment;
use App\Models\Calibration;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class CalibrationCommentPolicy
{
    public function view(User $user, CalibrationComment $comment): bool
    {
        return $user->can('view calibration comment');
    }

    public function create(User $user): bool
    {
        return true;
    }

    public function update(User $user, CalibrationComment $comment, Calibration $calibration): bool
    {
        if ($calibration->closed_at && $user->cannot('action closed calibration')) {
            return false;
        }

        if ($user->id == $comment->author_id)
            return true;

        return $user->can('update calibration comment');
    }

    public function delete(User $user, CalibrationComment $comment, Calibration $calibration): bool
    {
        if ($calibration->closed_at && $user->cannot('action closed calibration')) {
            return false;
        }

        if ($user->id == $comment->author_id)
            return true;

        return $user->can('delete calibration comment');
    }
}
