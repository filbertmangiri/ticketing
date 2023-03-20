<?php

namespace App\Models;

use App\Traits\QueryFilter;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Category extends Model
{
	use HasFactory;
	use SoftDeletes;

	use QueryFilter;

	protected $fillable = [
		'name',
		'slug',
		'description',
	];

	protected $sortableColumns = [
		'id',
		'name',
		'products_count',
	];

	protected $searchableColumns = [
		'name',
		'description',
	];

	public function getRouteKeyName()
	{
		return 'slug';
	}

	public function products()
	{
		return $this->hasMany(Product::class);
	}

	public function tickets()
	{
		return $this->hasManyThrough(Ticket::class, Product::class);
	}
}
