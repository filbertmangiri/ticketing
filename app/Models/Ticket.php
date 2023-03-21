<?php

namespace App\Models;

use App\Traits\QueryFilter;
use App\Enums\Ticket\Status;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Ticket extends Model
{
	use HasFactory;

	use QueryFilter;

	protected $fillable = [
		'number',
		'title',
		'body',
		'status',

		'priority_id',
		'product_id',
		'location_id',
		'issuer_id',
		'technician_id',

		// backup data
		'category_name',
		'product_name',
		'location_name',
		'issuer_name',
		'technician_name',

		'deadline_at',
		'solved_at',
		'closed_at',
	];

	protected $sortableColumns = [
		'number',
		'title',
		'status',
		'deadline_at',
		'created_at',
		'updated_at',
	];

	protected $sortableRelations = [
		'priority' => 'name',
		'category' => 'name',
		'product' => 'name',
		'location' => 'name',
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
		'priority' => ['name'],
		'product.category' => ['name'],
		'product' => ['name'],
		'location' => ['name'],
		'issuer' => ['name'],
		'technician' => ['name'],
	];

	protected $relationDetails = [
		'priority' => [
			'table' => 'priorities',
			'local_key' => 'id',
			'foreign_key' => 'priority_id',
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
		'location' => [
			'table' => 'locations',
			'local_key' => 'id',
			'foreign_key' => 'location_id',
		],
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
		'deadline_at' => 'datetime',
		'solved_at' => 'datetime',
		'closed_at' => 'datetime',
	];

	public function getRouteKeyName()
	{
		return 'number';
	}

	public function priority()
	{
		return $this->belongsTo(Priority::class);
	}

	public function product()
	{
		return $this->belongsTo(Product::class);
	}

	public function location()
	{
		return $this->belongsTo(Location::class);
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
		return $this->hasMany(TicketAttachment::class);
	}

	public function comments()
	{
		return $this->hasMany(Comment::class);
	}

	public static function boot()
	{
		parent::boot();

		static::creating(function (Ticket $ticket) {
			$ticket->number = self::generateNumber();
			$ticket->issuer_id = auth()->user()->id;

			/* Backup data */
			$ticket->issuer_name = $ticket->issuer?->name;
			$ticket->category_name = $ticket->product?->category?->name;
			$ticket->product_name = $ticket->product?->name;
			$ticket->location_name = $ticket->location?->name;
			$ticket->priority_name = $ticket->priority?->name;
			$ticket->technician_name = $ticket->technician?->name;

			$ticket->deadline_at = $ticket->priority
				? now()->addDays($ticket->priority?->deadline_days)
				: null;
		});

		static::updating(function ($ticket) {
			/* Backup data */
			$ticket->issuer_name = $ticket->issuer?->name;
			$ticket->category_name = $ticket->product?->category?->name;
			$ticket->product_name = $ticket->product?->name;
			$ticket->location_name = $ticket->location?->name;
			$ticket->priority_name = $ticket->priority?->name;
			$ticket->technician_name = $ticket->technician?->name;

			$ticket->deadline_at = $ticket->priority
				? now()->addDays($ticket->priority?->deadline_days)
				: null;
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
