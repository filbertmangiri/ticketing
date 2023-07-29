<?php

namespace App\Http\Controllers;

use Illuminate\Support\Str;
use App\Enums\Task\Status;
use App\Http\Controllers\Controller;
use App\Http\Requests\TaskComment\StoreTaskCommentRequest;
use App\Http\Requests\TaskComment\UpdateTaskCommentRequest;
use App\Models\Task;
use App\Models\TaskComment;

class TaskCommentController extends Controller
{
	public function __construct()
	{
		$this->authorizeResource(TaskComment::class, 'taskComment', [
			'except' => ['update', 'destroy'],
		]);
	}

	public function store(StoreTaskCommentRequest $request)
	{
		$validated = $request->validated();

		$task = Task::findOrFail($validated['task_id']);

		$comment = $task->comments()->create($validated);

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

		if ($request->user()->can('support assigned task')) {
			$task->update([
				'status' => Status::OnProgress,
			]);
		}

		$task->touch();
	}

	public function update(UpdateTaskCommentRequest $request, TaskComment $comment)
	{
		$this->authorize('update', [$comment, $comment->task]);

		$validated = $request->validated();

		$comment->update($validated);

		$task = Task::findOrFail($validated['task_id']);

		$task->touch();
	}

	public function destroy(TaskComment $comment)
	{
		$this->authorize('delete', [$comment, $comment->task]);

		$comment->delete();

		$comment->task->touch();
	}
}
