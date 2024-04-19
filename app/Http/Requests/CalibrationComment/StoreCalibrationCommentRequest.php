<?php

namespace App\Http\Requests\CalibrationComment;

use App\Models\Calibration;
use App\Models\CalibrationComment;
use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class StoreCalibrationCommentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'calibration_id' => ['required', 'integer', Rule::exists(Calibration::class, 'id')],
            'parent_id' => ['nullable', 'integer', Rule::exists(CalibrationComment::class, 'id')],
            'body' => ['required', 'string', 'min:5', 'max:10000'],
            'attachments' => ['nullable', 'array', 'max:5'],
            'attachments.*' => ['required_with:attachments', 'nullable', 'file', 'max:512000', 'mimes:jpg,jpeg,png,webp,gif,svg,pdf,doc,docx,xls,xlsx,csv,txt,zip,rar,mov,mp4,avi,mp3,wav,ogg,flac'],
        ];
    }

    public function attributes(): array
    {
        return [
            'calibration_id' => 'calibration',
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
