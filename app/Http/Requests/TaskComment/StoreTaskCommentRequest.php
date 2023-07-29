<?php

namespace App\Http\Requests\TaskComment;

use App\Models\Task;
use App\Models\TaskComment;
use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class StoreTaskCommentRequest extends FormRequest
{
	public function authorize(): bool
	{
		return true;
	}

	public function rules(): array
	{
		return [
			'task_id' => ['required', 'integer', Rule::exists(Task::class, 'id')],
			'parent_id' => ['nullable', 'integer', Rule::exists(TaskComment::class, 'id')],
			'body' => ['required', 'string', 'min:5', 'max:10000'],
			'attachments' => ['nullable', 'array', 'max:5'],
			'attachments.*' => ['required_with:attachments', 'nullable', 'file', 'max:512000', 'mimes:jpg,jpeg,png,webp,gif,svg,pdf,doc,docx,xls,xlsx,csv,txt,zip,rar,mov,mp4,avi,mp3,wav,ogg,flac'],
		];
	}

	public function attributes(): array
	{
		return [
			'task_id' => 'task',
			'parent_id' => 'parent comment',
			'body' => 'comment',
			'attachments.*' => 'attachment',
		];
	}

	public function messages()
	{
		return [
			'attachments.*.mimes' => 'The :attribute file type is not supported.',
		];
	}
}
