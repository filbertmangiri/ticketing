<?php

namespace App\Models;

use App\Traits\QueryFilter;
use App\Enums\Task\Status;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Task extends Model
{
    use HasFactory;

    use QueryFilter;

    protected $fillable = [
        'number',
        'title',
        'body',
        'status',
        'progress',

        'issuer_id',
        'technician_id',

        // backup data
        'issuer_name',
        'technician_name',

        'solved_at',
        'closed_at',
    ];

    protected $sortableColumns = [
        'number',
        'title',
        'status',
        'created_at',
        'updated_at',
    ];

    protected $sortableRelations = [
        'issuer' => 'name',
        'technician' => 'name',
    ];

    protected $searchableColumns = [
        'number',
        'title',
        'body',
        'status',
    ];

    protected $searchableRelations = [
        'issuer' => ['name'],
        'technician' => ['name'],
    ];

    protected $relationDetails = [
        'issuer' => [
            'table' => 'users',
            'local_key' => 'id',
            'foreign_key' => 'issuer_id',
        ],
        'technician' => [
            'table' => 'users',
            'local_key' => 'id',
            'foreign_key' => 'technician_id',
        ],
    ];

    protected $casts = [
        'status' => Status::class,
        'solved_at' => 'datetime',
        'closed_at' => 'datetime',
    ];

    public function getRouteKeyName()
    {
        return 'number';
    }

    public function issuer()
    {
        return $this->belongsTo(User::class, 'issuer_id');
    }

    public function technician()
    {
        return $this->belongsTo(User::class, 'technician_id');
    }

    public function attachments()
    {
        return $this->hasMany(TaskAttachment::class);
    }

    public function comments()
    {
        return $this->hasMany(TaskComment::class);
    }

    public function progresses()
    {
        return $this->hasMany(TaskProgress::class);
    }

    public static function boot()
    {
        parent::boot();

        static::creating(function (Task $task) {
            $task->number = self::generateNumber();
            $task->issuer_id = auth()->user()->id;

            /* Backup data */
            $task->issuer_name = $task->issuer?->name;
            $task->technician_name = $task->technician?->name;
        });

        static::updating(function ($task) {
            /* Backup data */
            $task->issuer_name = $task->issuer?->name;
            $task->technician_name = $task->technician?->name;
        });
    }

    public static function generateNumber()
    {
        $number = 'TASK' . '-' . date('Ymd') . '-';

        $last = self::where('number', 'like', $number . '%')
            ->orderBy('number', 'desc')
            ->first();

        if ($last) {
            $number .= str_pad((int) substr($last->number, -3) + 1, 3, '0', STR_PAD_LEFT);
        } else {
            $number .= '001';
        }

        return $number;
    }
}
