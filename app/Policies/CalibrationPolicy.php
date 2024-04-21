<?php

namespace App\Policies;

use App\Models\Calibration;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class CalibrationPolicy
{
    public function viewAny(User $user): bool
    {
        if ($user->sub_department_id) {
            return true;
        }

        return $user->can('view any calibration');
    }

    public function view(User $user, Calibration $calibration): bool
    {
        if ($user->can('create calibration')) {
            return true;
        }

        if ($user->id == $calibration->issuer?->id) {
            return true;
        }

        if ($user->subDepartment?->department?->id == $calibration->department_id) {
            return true;
        }

        if ($user->can('view calibration')) {
            return true;
        }

        return false;
    }

    public function create(User $user): bool
    {
        return $user->can('create calibration');
    }

    public function assign(User $user, Calibration $calibration): bool
    {
        if ($calibration->closed_at) {
            return false;
        }

        if ($user?->subDepartment?->department?->id == $calibration->department_id) {
            return true;
        }

        return false;
    }

    public function update(User $user, Calibration $calibration): bool
    {
        if ($calibration->closed_at && $user->cannot('action closed calibration')) {
            return false;
        }

        if ($user->id == $calibration->issuer_id) {
            return true;
        }

        return $user->can('update calibration');
    }

    public function delete(User $user, Calibration $calibration): bool
    {
        return $user->can('delete calibration');
    }

    public function restore(User $user, Calibration $calibration): bool
    {
        return $user->can('restore calibration');
    }

    public function forceDelete(User $user, Calibration $calibration): bool
    {
        return $user->can('force delete calibration');
    }

    public function close(User $user, Calibration $calibration): bool
    {
        return $user->can('close calibration');
    }

    public function reopen(User $user, Calibration $calibration): bool
    {
        return $user->can('close calibration');
    }

    public function createProgress(User $user, Calibration $calibration): bool
    {
        if ($user->can('create calibration')) {
            return true;
        }

        if ($calibration->closed_at) {
            return false;
        }

        if ($user->subDepartment?->department?->id == $calibration->department_id) {
            return true;
        }

        return false;
    }
}
