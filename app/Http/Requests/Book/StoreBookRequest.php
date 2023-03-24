<?php

namespace App\Http\Requests\Book;

use App\Enums\BookType;
use App\Models\Book;
use Illuminate\Support\Str;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreBookRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function prepareForValidation(): void
    {
        $this->merge([
            'slug' => Str::slug($this->title),
            'type' => $this->type['value'] ?? null,
        ]);
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'slug' => Rule::unique(Book::class),
            'description' => ['required', 'string', 'min:10', 'max:1000'],
            'url' => ['required', 'string', 'url', 'max:255'],
            'type' => ['required', 'string', Rule::in([BookType::EBook->value, BookType::Manual->value])],
        ];
    }

    public function attributes(): array
    {
        return [
            'slug' => 'title',
        ];
    }
}
