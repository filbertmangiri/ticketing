<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Progress extends Model
{
    use HasFactory;

    protected $fillable = [
        'ticket_id',
        'value',
        'description',
        'created_at',
    ];

    public function ticket()
    {
        return $this->belongsTo(Ticket::class);
    }
}
