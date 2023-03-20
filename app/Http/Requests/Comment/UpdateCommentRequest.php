<?php

namespace App\Http\Requests\Comment;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCommentRequest extends FormRequest
{
	public function authorize(): bool
	{
		return true;
	}

	public function rules(): array
	{
		return [
			'body' => ['required', 'string', 'min:5', 'max:10000'],
		];
	}

	public function attributes(): array
	{
		return [
			'body' => 'comment',
		];
	}
}
