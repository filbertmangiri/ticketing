<?php

namespace App\Http\Controllers;

use App\Enums\Ticket\Status;
use App\Models\Comment;
use App\Http\Requests\Comment\StoreCommentRequest;
use App\Http\Requests\Comment\UpdateCommentRequest;
use App\Models\Ticket;

class CommentController extends Controller
{
	public function __construct()
	{
		$this->authorizeResource(Comment::class, 'comment', [
			'except' => ['update', 'destroy'],
		]);
	}

	public function store(StoreCommentRequest $request)
	{
		$validated = $request->validated();

		$ticket = Ticket::findOrFail($validated['ticket_id']);

		$ticket->comments()->create($validated);

		if ($request->user()->can('support assigned ticket')) {
			$ticket->update([
				'status' => Status::OnProgress,
			]);
		}
	}

	public function update(UpdateCommentRequest $request, Comment $comment)
	{
		$this->authorize('update', [$comment, $comment->ticket]);

		$validated = $request->validated();

		$comment->update($validated);
	}

	public function destroy(Comment $comment)
	{
		$this->authorize('delete', [$comment, $comment->ticket]);

		$comment->delete();
	}
}
