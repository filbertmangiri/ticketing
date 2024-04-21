<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CalibrationProgress extends Model
{
    use HasFactory;

    protected $fillable = [
        'calibration_id',
        'issuer_id',
        'issuer_name',
        'department_name',
        'description',
        'is_assign',
        'created_at',
    ];

    public function calibration()
    {
        return $this->belongsTo(Calibration::class);
    }

    public function issuer()
    {
        return $this->belongsTo(User::class, 'issuer_id');
    }

    public static function boot()
    {
        parent::boot();

        static::creating(function (CalibrationProgress $calibrationProgress) {
            $calibrationProgress->issuer_id = auth()->user()->id;
            $calibrationProgress->issuer_name = auth()->user()->name;
            $calibrationProgress->department_name = auth()->user()->subDepartment?->department?->name;
        });
    }
}
