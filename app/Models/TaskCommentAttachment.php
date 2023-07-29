<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TaskCommentAttachment extends Model
{
    use HasFactory;

    protected $fillable = [
        'path',
        'name',
        'mime_type',
        'size',
        'comment_id',
    ];

    public function comment()
    {
        return $this->belongsTo(TaskComment::class);
    }
}
