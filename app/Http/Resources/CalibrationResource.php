<?php

namespace App\Http\Resources;

use App\Models\CalibrationProgress;
use App\Models\Calibration;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CalibrationResource extends JsonResource
{
	public function toArray(Request $request): array
	{
		$progresses = collect($this->progresses);

		if ($this->created_at) {
			$progresses = $progresses->push(new CalibrationProgress([
				'description' => 'The calibration ticket has been opened',
				'created_at' => $this->created_at,
			]));
		}

		if ($this->closed_at) {
			$progresses = $progresses->push(new CalibrationProgress([
				'description' => 'The calibration ticket has been closed',
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
			'progresses' => CalibrationProgressResource::collection($progresses->sortBy('created_at', SORT_REGULAR, true))->toArray($request),

			'issuer' => $this->issuer?->only('id', 'username', 'name') ?? $this->issuer_name,
			'department' => $this->issuer?->subDepartment?->department?->only('id', 'name', 'slug') ?? null,
			'sub_department' => $this->issuer?->subDepartment?->only('id', 'name', 'slug') ?? null,

			'for_department' => $this->department?->only('id', 'name', 'slug') ?? $this->department_name,

			// 'comments' => TaskCommentResource::collection($this->comments->where('parent_id', null)->sortByDesc('created_at')),

			'attachments' => CalibrationAttachmentResource::collection($this->attachments),

			'closed_at' => $this->closed_at?->diffForHumans(),

			'created_at' => $this->created_at?->diffForHumans(),
			'updated_at' => $this->updated_at?->diffForHumans(),

			'can' => [
				'assign' => $request->user()?->can('assign', [Calibration::class, new Calibration([
					'department_id' => $this->department_id,
					'closed_at' => $this->closed_at,
				])]),
				'update' => $request->user()?->can('update', new Calibration([
					'issuer_id' => $this->issuer_id,
					'closed_at' => $this->closed_at,
				])),
				'solved' => $request->user()?->can('solved', new Calibration([
					'issuer_id' => $this->issuer_id,
					'closed_at' => $this->closed_at,
				])),
				'create_progress' => $request->user()?->can('createProgress', [Calibration::class, new Calibration([
					'department_id' => $this->department_id,
					'closed_at' => $this->closed_at,
				])]),
			],
		];
	}
}
