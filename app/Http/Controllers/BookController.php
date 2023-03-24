<?php

namespace App\Http\Controllers;

use App\Enums\BookType;
use App\Models\Book;
use App\Http\Requests\Book\StoreBookRequest;
use App\Http\Requests\Book\UpdateBookRequest;
use App\Http\Resources\BookResource;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class BookController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Book::class, 'book', [
            'except' => ['index'],
        ]);
    }

    public function index(Request $request, string $type = null)
    {
        $builder = Book::when($type, function (Builder $query, $type) {
            if (!in_array($type, [BookType::EBook->value, BookType::Manual->value])) {
                abort(404);
            }

            return $query->where('type', $type);
        })->filterWithPagination();

        $additional = Book::filterAdditional($builder);

        $books = fn () => BookResource::collection($builder)->additional($additional);

        return inertia('Books/Index', compact('books'));
    }

    public function store(StoreBookRequest $request)
    {
        $validated = $request->validated();

        Book::create($validated);
    }

    public function show(Book $book)
    {
        //
    }

    public function update(UpdateBookRequest $request, Book $book)
    {
        $validated = $request->validated();

        $book->update($validated);
    }

    public function destroy(Book $book)
    {
        $book->delete();
    }

    public function restore(Book $book)
    {
        $book->restore();
    }

    public function forceDelete(Book $book)
    {
        $book->forceDelete();
    }
}
