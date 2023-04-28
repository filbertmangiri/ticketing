<?php

namespace App\Http\Requests\Comment;

use App\Models\Ticket;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateCommentRequest extends FormRequest
{
	public function authorize(): bool
	{
		return true;
	}

	public function rules(): array
	{
		return [
			'ticket_id' => ['required', 'integer', Rule::exists(Ticket::class, 'id')],
			'body' => ['required', 'string', 'min:5', 'max:10000'],
		];
	}

	public function attributes(): array
	{
		return [
			'ticket_id' => 'ticket',
			'body' => 'comment',
		];
	}
}
