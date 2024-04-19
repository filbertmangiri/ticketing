<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CalibrationProgress extends Model
{
    use HasFactory;

    protected $fillable = [
        'calibration_id',
        'description',
        'created_at',
    ];

    public function calibration()
    {
        return $this->belongsTo(Calibration::class);
    }
}
