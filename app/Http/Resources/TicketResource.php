<?php

namespace App\Http\Resources;

use App\Models\Progress;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TicketResource extends JsonResource
{
	public function toArray(Request $request): array
	{
		$progresses = collect($this->progresses);

		if ($this->created_at) {
			$progresses = $progresses->push(new Progress([
				'value' => 'created',
				'description' => 'The user submitted the ticket',
				'created_at' => $this->created_at,
			]));
		}

		if ($this->solved_at) {
			$progresses = $progresses->push(new Progress([
				'value' => 'solved',
				'description' => 'The user has marked the ticket as solved',
				'created_at' => $this->solved_at,
			]));
		}

		if ($this->closed_at) {
			$progresses = $progresses->push(new Progress([
				'value' => 'closed',
				'description' => 'The administrator has closed the ticket',
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
			'progresses' => ProgressResource::collection($progresses->sortBy('created_at', SORT_REGULAR, true))->toArray($request),

			'priority' => $this?->priority ? [
				'id' => $this->priority->id,
				'name' => $this->priority->name,
				'slug' => $this->priority->slug,
			] : null,

			'category' => $this->product?->category?->only('id', 'name', 'slug') ?? $this->category_name,
			'product' => $this->product?->only('id', 'name', 'slug') ?? $this->product_name,
			'location' => $this->location?->only('id', 'name', 'slug') ?? $this->location_name,

			'issuer' => $this->issuer?->only('id', 'username', 'name') ?? $this->issuer_name,
			'department' => $this->issuer?->subDepartment?->department?->only('id', 'name', 'slug') ?? null,
			'sub_department' => $this->issuer?->subDepartment?->only('id', 'name', 'slug') ?? null,

			'technician' => $this->technician?->only('id', 'username', 'name') ?? $this->technician_name,

			// 'comments' => CommentResource::collection($this->comments->where('parent_id', null)->sortByDesc('created_at')),

			'attachments' => AttachmentResource::collection($this->attachments),

			'deadline_at' => $this->deadline_at?->format('d F Y'),
			'solved_at' => $this->solved_at?->diffForHumans(),
			'closed_at' => $this->closed_at?->diffForHumans(),

			'created_at' => $this->created_at?->diffForHumans(),
			'updated_at' => $this->updated_at?->diffForHumans(),

			'can' => [
				'update' => $request->user()?->can('update', new Ticket([
					'issuer_id' => $this->issuer_id,
					'closed_at' => $this->closed_at,
				])),
				'solved' => $request->user()?->can('solved', new Ticket([
					'issuer_id' => $this->issuer_id,
					'closed_at' => $this->closed_at,
				])),
				'create_progress' => $request->user()?->can('createProgress', [Ticket::class, new Ticket([
					'technician_id' => $this->technician_id,
					'closed_at' => $this->closed_at,
				])]),
			],
		];
	}
}
