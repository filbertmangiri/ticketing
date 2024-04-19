<?php

namespace App\Http\Requests\CalibrationComment;

use App\Models\Calibration;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateCalibrationCommentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'calibration_id' => ['required', 'integer', Rule::exists(Calibration::class, 'id')],
            'body' => ['required', 'string', 'min:5', 'max:10000'],
        ];
    }

    public function attributes(): array
    {
        return [
            'calibration_id' => 'calibration',
            'body' => 'comment',
        ];
    }
}
