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
}
