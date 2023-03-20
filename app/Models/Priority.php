<?php

namespace App\Models;

use App\Traits\QueryFilter;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Priority extends Model
{
	use HasFactory;
	use SoftDeletes;

	use QueryFilter;

	protected $fillable = [
		'name',
		'slug',
		'deadline_days',
	];

	protected $sortableColumns = [
		'id',
		'name',
		'deadline_days',
	];

	protected $searchableColumns = [
		'name',
		'deadline_days',
	];

	public function getRouteKeyName()
	{
		return 'slug';
	}

	public function tickets()
	{
		return $this->hasMany(Ticket::class);
	}
}
