<?php

namespace App\Models;

use App\Enums\BookType;
use App\Traits\QueryFilter;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Book extends Model
{
    use HasFactory;
    use SoftDeletes;

    use QueryFilter;

    protected $fillable = [
        'title',
        'slug',
        'description',
        'url',
        'type',
    ];

    protected $sortableColumns = [
        'id',
        'title',
        'url',
        'type',
    ];

    protected $searchableColumns = [
        'title',
        'url',
        'type',
    ];

    protected $casts = [
        'type' => BookType::class,
    ];

    public function getRouteKeyName()
    {
        return 'slug';
    }
}
