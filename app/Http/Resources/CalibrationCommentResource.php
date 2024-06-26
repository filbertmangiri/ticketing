<?php

namespace App\Http\Resources;

use App\Models\CalibrationComment;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CalibrationCommentResource extends JsonResource
{
	public function toArray(Request $request): array
	{
		return [
			// ...parent::toArray($request),

			'id' => $this->id,

			'body' => $this->body,

			'author' => $this->author?->only('id', 'username', 'name') ?? $this->author_name,
			'author_profile_picture' => $this->author?->getProfilePicture() ?? User::$profile_picture_default,

			'attachments' => CalibrationAttachmentResource::collection($this->attachments),

			'childrens' => CalibrationCommentResource::collection($this->childrens),

			'created_at' => $this->created_at?->format('l, d F Y - H:i:s'),
			'updated_at' => $this->updated_at?->diffForHumans(),

			'can' => [
				'create' => $request->user()?->can('create', CalibrationComment::class),
				'update' => $request->user()?->can('update', [new CalibrationComment([
					'author_id' => $this->author_id,
				]), $this->calibration]),
				'delete' => $request->user()?->can('delete', [new CalibrationComment([
					'author_id' => $this->author_id,
				]), $this->calibration]),
			],
		];
	}
}
