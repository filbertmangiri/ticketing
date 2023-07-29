<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TaskProgress extends Model
{
    use HasFactory;

    protected $fillable = [
        'task_id',
        'value',
        'description',
        'created_at',
    ];

    public function task()
    {
        return $this->belongsTo(Task::class);
    }
}
