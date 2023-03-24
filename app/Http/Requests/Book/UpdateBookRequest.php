<?php

namespace App\Http\Requests\Book;

use App\Models\Book;
use Illuminate\Support\Str;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateBookRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function prepareForValidation(): void
    {
        $this->merge([
            'slug' => Str::slug($this->title),
        ]);
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'slug' => Rule::unique(Book::class)->ignore($this->route('book')),
            'description' => ['required', 'string', 'min:10', 'max:1000'],
            'url' => ['required', 'string', 'url', 'max:255'],
        ];
    }

    public function attributes(): array
    {
        return [
            'slug' => 'title',
        ];
    }
}
