<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TaskComment extends Model
{
    use HasFactory;

    protected $fillable = [
        'author_id',
        'author_name',
        'parent_id',
        'body',
    ];

    public function author()
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    public function parent()
    {
        return $this->belongsTo(TaskComment::class, 'parent_id');
    }

    public function childrens()
    {
        return $this->hasMany(TaskComment::class, 'parent_id')->with('childrens', 'author');
    }

    public function task()
    {
        return $this->belongsTo(Task::class);
    }

    public function attachments()
    {
        return $this->hasMany(TaskCommentAttachment::class);
    }

    public static function boot()
    {
        parent::boot();

        static::creating(function ($comment) {
            $comment->author_id = auth()->user()->id;
            $comment->author_name = auth()->user()->name;
        });
    }
}
