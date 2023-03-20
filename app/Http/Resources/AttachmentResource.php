<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AttachmentResource extends JsonResource
{
	public function toArray(Request $request): array
	{
		return [
			...parent::toArray($request),

			'path' => url('storage/' . $this->path),
			'storage_path' => $this->path,
		];
	}
}
