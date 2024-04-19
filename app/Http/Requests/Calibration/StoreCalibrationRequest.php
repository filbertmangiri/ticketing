<?php

namespace App\Http\Requests\Calibration;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreCalibrationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function prepareForValidation(): void
    {
        $this->merge([
            'department_id' => $this->department['value'] ?? null,
            'category_id' => $this->category['value'] ?? null,
            'product_id' => $this->product['value'] ?? null,
        ]);
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'min:10', 'max:255'],
            'body' => ['required', 'string', 'min:10', 'max:65535'],
            'department_id' => ['required', Rule::exists('users', 'id')],
            'category_id' => ['required', 'integer', Rule::exists(Category::class, 'id')],
            'product_id' => ['nullable', 'required_with:category_id', 'integer', Rule::exists(Product::class, 'id')],
            'attachments' => ['nullable', 'array', 'max:5'],
            'attachments.*' => ['required_with:attachments', 'nullable', 'file', 'max:512000', 'mimes:jpg,jpeg,png,webp,gif,svg,pdf,doc,docx,xls,xlsx,csv,txt,zip,rar,mov,mp4,avi,mp3,wav,ogg,flac'],
        ];
    }

    public function attributes(): array
    {
        return [
            'title' => 'subject',
            'body' => 'description',
            'department_id' => 'department',
            'category_id' => 'category',
            'product_id' => 'product',
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
