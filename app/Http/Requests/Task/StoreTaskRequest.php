<?php

namespace App\Http\Requests\Task;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreTaskRequest extends FormRequest
{
	public function authorize(): bool
	{
		return true;
	}

	public function prepareForValidation(): void
	{
		$this->merge([
			'technician_id' => $this->technician['value'] ?? null,
		]);
	}

	public function rules(): array
	{
		return [
			'title' => ['required', 'string', 'min:10', 'max:255'],
			'body' => ['required', 'string', 'min:10', 'max:65535'],
			'technician_id' => ['required', Rule::exists('users', 'id')],
			'attachments' => ['nullable', 'array', 'max:5'],
			'attachments.*' => ['required_with:attachments', 'nullable', 'file', 'max:512000', 'mimes:jpg,jpeg,png,webp,gif,svg,pdf,doc,docx,xls,xlsx,csv,txt,zip,rar,mov,mp4,avi,mp3,wav,ogg,flac'],
		];
	}

	public function attributes(): array
	{
		return [
			'title' => 'subject',
			'body' => 'description',
			'technician_id' => 'technician',
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
