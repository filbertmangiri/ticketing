<?php

namespace App\Policies;

use App\Models\Ticket;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class TicketPolicy
{
	public function viewAny(User $user): bool
	{
		if ($user->can('view assigned ticket')) {
			return true;
		}

		if ($user->can('create ticket')) {
			return true;
		}

		return $user->can('view any ticket');
	}

	public function view(User $user, Ticket $ticket): bool
	{
		if ($user->can('view any ticket')) {
			return true;
		}

		if ($user->id == $ticket->issuer?->id) {
			return true;
		}

		if ($user->id == $ticket->technician?->id) {
			return true;
		}

		return false;
	}

	public function create(User $user): bool
	{
		return $user->can('create ticket');
	}

	public function update(User $user, Ticket $ticket): bool
	{
		if ($ticket->closed_at && $user->cannot('action closed ticket')) {
			return false;
		}

		if ($user->id == $ticket->issuer_id) {
			return true;
		}

		return $user->can('update ticket');
	}

	public function delete(User $user, Ticket $ticket): bool
	{
		return $user->can('delete ticket');
	}

	public function restore(User $user, Ticket $ticket): bool
	{
		return $user->can('restore ticket');
	}

	public function forceDelete(User $user, Ticket $ticket): bool
	{
		return $user->can('force delete ticket');
	}

	public function assign(User $user, Ticket $ticket): bool
	{
		return $user->can('assign ticket');
	}

	public function solved(User $user, Ticket $ticket): bool
	{
		if ($ticket->closed_at) {
			return false;
		}

		return $user->id == $ticket->issuer?->id && !$ticket->solved_at;
	}

	public function close(User $user, Ticket $ticket): bool
	{
		return $user->can('close ticket');
	}

	public function reopen(User $user, Ticket $ticket): bool
	{
		return $user->can('close ticket');
	}

	public function createProgress(User $user, Ticket $ticket): bool
	{
		if ($ticket->closed_at) {
			return false;
		}

		return $user->id == $ticket->technician_id;
	}
}
