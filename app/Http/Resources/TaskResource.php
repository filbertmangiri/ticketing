<?php

namespace App\Http\Resources;

use App\Models\TaskProgress;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
{
	public function toArray(Request $request): array
	{
		$progresses = collect($this->progresses);

		if ($this->created_at) {
			$progresses = $progresses->push(new TaskProgress([
				'value' => 'created',
				'description' => 'The administrator assigned the task',
				'created_at' => $this->created_at,
			]));
		}

		if ($this->closed_at) {
			$progresses = $progresses->push(new TaskProgress([
				'value' => 'closed',
				'description' => 'The administrator has closed the task',
				'created_at' => $this->closed_at,
			]));
		}

		return [
			// ...parent::toArray($request),

			'id' => $this->id,
			'number' => $this->number,

			'title' => $this->title,
			'body' => $this->body,

			'status' => $this?->status ? [
				'value' => $this->status->value,
				'label' => $this->status->label(),
				'level' => $this->status->level(),
			] : null,

			'progress' => $this->progress ?? 0,
			'progresses' => TaskProgressResource::collection($progresses->sortBy('created_at', SORT_REGULAR, true))->toArray($request),

			'issuer' => $this->issuer?->only('id', 'username', 'name') ?? $this->issuer_name,
			'department' => $this->issuer?->subDepartment?->department?->only('id', 'name', 'slug') ?? null,
			'sub_department' => $this->issuer?->subDepartment?->only('id', 'name', 'slug') ?? null,

			'technician' => $this->technician?->only('id', 'username', 'name') ?? $this->technician_name,

			// 'comments' => TaskCommentResource::collection($this->comments->where('parent_id', null)->sortByDesc('created_at')),

			'attachments' => TaskAttachmentResource::collection($this->attachments),

			'solved_at' => $this->solved_at?->diffForHumans(),
			'closed_at' => $this->closed_at?->diffForHumans(),

			'created_at' => $this->created_at?->diffForHumans(),
			'updated_at' => $this->updated_at?->diffForHumans(),

			'can' => [
				'update' => $request->user()?->can('update', new Task([
					'issuer_id' => $this->issuer_id,
					'closed_at' => $this->closed_at,
				])),
				'solved' => $request->user()?->can('solved', new Task([
					'issuer_id' => $this->issuer_id,
					'closed_at' => $this->closed_at,
				])),
				'create_progress' => $request->user()?->can('createProgress', [Task::class, new Task([
					'technician_id' => $this->technician_id,
					'closed_at' => $this->closed_at,
				])]),
			],
		];
	}
}
