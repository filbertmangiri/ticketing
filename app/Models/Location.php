<?php

namespace App\Models;

use App\Traits\QueryFilter;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Location extends Model
{
	use HasFactory;
	use SoftDeletes;

	use QueryFilter;

	protected $fillable = [
		'name',
		'slug',
	];

	protected $sortableColumns = [
		'id',
		'name',
	];

	protected $searchableColumns = [
		'name',
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
