<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TicketAttachment extends Model
{
	use HasFactory;

	protected $fillable = [
		'path',
		'name',
		'mime_type',
		'size',
		'ticket_id',
	];

	public function ticket()
	{
		return $this->belongsTo(Ticket::class);
	}
}
