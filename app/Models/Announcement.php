<?php

namespace App\Models;

use App\Traits\QueryFilter;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Announcement extends Model
{
    use HasFactory;

    use QueryFilter;

    protected $fillable = [
        'title',
        'body',
        'author_id',
    ];

    protected $sortableColumns = [
        'id',
        'title',
    ];

    protected $sortableRelations = [
        'author' => 'name',
    ];

    protected $searchableColumns = [
        'title',
        'body',
    ];

    protected $searchableRelations = [
        'author' => ['name'],
    ];

    protected $relationDetails = [
        'author' => [
            'table' => 'users',
            'local_key' => 'id',
            'foreign_key' => 'author_id',
        ],
    ];

    public function author()
    {
        return $this->belongsTo(User::class);
    }

    public static function boot()
    {
        parent::boot();

        static::creating(function (Announcement $announcement) {
            $announcement->author_id = auth()->id();
        });
    }
}
