<?php

namespace App\Http\Requests\Comment;

use App\Models\Ticket;
use App\Models\Comment;
use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class StoreCommentRequest extends FormRequest
{
	public function authorize(): bool
	{
		return true;
	}

	public function rules(): array
	{
		return [
			'ticket_id' => ['required', 'integer', Rule::exists(Ticket::class, 'id')],
			'parent_id' => ['nullable', 'integer', Rule::exists(Comment::class, 'id')],
			'body' => ['required', 'string', 'min:5', 'max:10000'],
		];
	}

	public function attributes(): array
	{
		return [
			'ticket_id' => 'ticket',
			'parent_id' => 'parent comment',
			'body' => 'comment',
		];
	}
}
