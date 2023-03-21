<?php

namespace App\Http\Requests\Announcement;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAnnouncementRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:50'],
            'body' => ['required', 'string', 'max:500'],
        ];
    }

    public function attributes()
    {
        return [
            'body' => 'description',
        ];
    }
}
