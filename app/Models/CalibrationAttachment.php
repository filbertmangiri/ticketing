<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CalibrationAttachment extends Model
{
    use HasFactory;

    protected $fillable = [
        'path',
        'name',
        'mime_type',
        'size',
        'calibration_id',
    ];

    public function calibration()
    {
        return $this->belongsTo(Calibration::class);
    }
}
