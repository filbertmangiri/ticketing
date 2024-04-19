<?php

namespace App\Http\Requests\Calibration;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateCalibrationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'min:10', 'max:255'],
            'body' => ['required', 'string', 'min:10', 'max:65535'],
        ];
    }

    public function attributes(): array
    {
        return [
            'title' => 'subject',
            'body' => 'description',
            'attachments.*' => 'attachment',
        ];
    }
}
