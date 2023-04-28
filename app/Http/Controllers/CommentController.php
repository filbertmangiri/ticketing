<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use App\Models\Comment;
use Illuminate\Support\Str;
use App\Enums\Ticket\Status;
use App\Http\Controllers\Controller;
use App\Http\Requests\Comment\StoreCommentRequest;
use App\Http\Requests\Comment\UpdateCommentRequest;

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

		$comment = $ticket->comments()->create($validated);

		$attachments = [];

		foreach ($validated['attachments'] as $file) {
			$attachments[] = [
				'path' => $file->storeAs('attachments', date('Ymd') . '-' . Str::uuid() . '.' . $file->getClientOriginalExtension()),
				'name' => $file->getClientOriginalName(),
				'mime_type' => $file->getMimeType(),
				'size' => $file->getSize(),
			];
		}

		$comment->attachments()->createMany($attachments);

		if ($request->user()->can('support assigned ticket')) {
			$ticket->update([
				'status' => Status::OnProgress,
			]);
		}

		$ticket->touch();
	}

	public function update(UpdateCommentRequest $request, Comment $comment)
	{
		$this->authorize('update', [$comment, $comment->ticket]);

		$validated = $request->validated();

		$comment->update($validated);

		$ticket = Ticket::findOrFail($validated['ticket_id']);

		$ticket->touch();
	}

	public function destroy(Comment $comment)
	{
		$this->authorize('delete', [$comment, $comment->ticket]);

		$comment->delete();

		$comment->ticket->touch();
	}
}
