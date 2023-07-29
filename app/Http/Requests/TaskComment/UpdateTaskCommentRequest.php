<?php

namespace App\Http\Requests\TaskComment;

use App\Models\Task;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateTaskCommentRequest extends FormRequest
{
	public function authorize(): bool
	{
		return true;
	}

	public function rules(): array
	{
		return [
			'task_id' => ['required', 'integer', Rule::exists(Task::class, 'id')],
			'body' => ['required', 'string', 'min:5', 'max:10000'],
		];
	}

	public function attributes(): array
	{
		return [
			'task_id' => 'task',
			'body' => 'comment',
		];
	}
}
