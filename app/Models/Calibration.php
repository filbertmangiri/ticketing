<?php

namespace App\Models;

use App\Enums\Calibration\Status;
use App\Models\Department\Department;
use App\Traits\QueryFilter;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Calibration extends Model
{
    use HasFactory;

    use QueryFilter;

    protected $fillable = [
        'number',
        'title',
        'body',
        'status',

        'product_id',
        'issuer_id',
        'department_id',

        // backup data
        'department_name',
        'category_name',
        'product_name',
        'issuer_name',

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
        'department' => 'name',
        'category' => 'name',
        'product' => 'name',
        'issuer' => 'name',
    ];

    protected $searchableColumns = [
        'number',
        'title',
        'body',
        'status',
    ];

    protected $searchableRelations = [
        'department' => ['name'],
        'product.category' => ['name'],
        'product' => ['name'],
        'issuer' => ['name'],
    ];

    protected $relationDetails = [
        'department' => [
            'table' => 'departments',
            'local_key' => 'id',
            'foreign_key' => 'department_id',
        ],
        'category' => [
            'table' => 'categories',
            'local_key' => 'id',
            'foreign_key' => 'category_id',
            'through' => 'product',
        ],
        'product' => [
            'table' => 'products',
            'local_key' => 'id',
            'foreign_key' => 'product_id',
        ],
        'issuer' => [
            'table' => 'users',
            'local_key' => 'id',
            'foreign_key' => 'issuer_id',
        ],
    ];

    protected $casts = [
        'status' => Status::class,
        'closed_at' => 'datetime',
    ];

    public function getRouteKeyName()
    {
        return 'number';
    }

    public function department()
    {
        return $this->belongsTo(Department::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function issuer()
    {
        return $this->belongsTo(User::class, 'issuer_id');
    }

    public function attachments()
    {
        return $this->hasMany(CalibrationAttachment::class);
    }

    public function comments()
    {
        return $this->hasMany(CalibrationComment::class);
    }

    public function progresses()
    {
        return $this->hasMany(CalibrationProgress::class);
    }

    public static function boot()
    {
        parent::boot();

        static::creating(function (Calibration $calibration) {
            $calibration->number = self::generateNumber();
            $calibration->issuer_id = auth()->user()->id;

            /* Backup data */
            $calibration->issuer_name = $calibration->issuer?->name;
            $calibration->department_name = $calibration->department?->name;
            $calibration->category_name = $calibration->product?->category?->name;
            $calibration->product_name = $calibration->product?->name;
        });

        static::updating(function ($calibration) {
            /* Backup data */
            $calibration->issuer_name = $calibration->issuer?->name;
            $calibration->department_name = $calibration->department?->name;
            $calibration->category_name = $calibration->product?->category?->name;
            $calibration->product_name = $calibration->product?->name;
        });
    }

    public static function generateNumber()
    {
        $number = 'T' . '-' . date('Ymd') . '-';

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
