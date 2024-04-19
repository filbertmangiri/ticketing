<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CalibrationComment extends Model
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
        return $this->belongsTo(CalibrationComment::class, 'parent_id');
    }

    public function childrens()
    {
        return $this->hasMany(CalibrationComment::class, 'parent_id')->with('childrens', 'author');
    }

    public function calibration()
    {
        return $this->belongsTo(Calibration::class);
    }

    public function attachments()
    {
        return $this->hasMany(CalibrationCommentAttachment::class);
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
