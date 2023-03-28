<?php

namespace App\Policies;

use App\Models\Comment;
use App\Models\Ticket;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class CommentPolicy
{
	public function view(User $user, Comment $comment): bool
	{
		return $user->can('view comment');
	}

	public function create(User $user): bool
	{
		/* if ($ticket->closed_at && $user->cannot('action closed ticket')) {
			return false;
		} */

		return true;
	}

	public function update(User $user, Comment $comment, Ticket $ticket): bool
	{
		if ($ticket->closed_at && $user->cannot('action closed ticket')) {
			return false;
		}

		if ($user->id == $comment->author_id)
			return true;

		return $user->can('update comment');
	}

	public function delete(User $user, Comment $comment, Ticket $ticket): bool
	{
		if ($ticket->closed_at && $user->cannot('action closed ticket')) {
			return false;
		}

		if ($user->id == $comment->author_id)
			return true;

		return $user->can('delete comment');
	}
}
