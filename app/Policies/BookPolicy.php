<?php

namespace App\Policies;

use App\Models\Book;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class BookPolicy
{
    public function view(User $user, Book $book): bool
    {
        return $user->can('view book');
    }

    public function create(User $user): bool
    {
        return $user->can('create book');
    }

    public function update(User $user, Book $book): bool
    {
        return $user->can('update book');
    }

    public function delete(User $user, Book $book): bool
    {
        return $user->can('delete book');
    }

    public function restore(User $user, Book $book): bool
    {
        return $user->can('restore book');
    }

    public function forceDelete(User $user, Book $book): bool
    {
        return $user->can('force delete book');
    }
}
