<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AnnouncementResource extends JsonResource
{
	public function toArray(Request $request): array
	{
		return [
			// ...parent::toArray($request),

			'id' => $this->id,
			'title' => $this->title,
			'body' => $this->body,
			'author' => $this->author?->only('id', 'name', 'username'),
		];
	}
}
