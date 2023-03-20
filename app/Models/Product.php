<?php

namespace App\Models;

use App\Traits\QueryFilter;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
	use HasFactory;
	use SoftDeletes;

	use QueryFilter;

	protected $fillable = [
		'name',
		'slug',
		'description',
		'category_id',
	];

	protected $sortableColumns = [
		'id',
		'name',
	];

	protected $sortableRelations = [
		'category' => 'name',
	];

	protected $searchableColumns = [
		'name',
		'description',
	];

	protected $searchableRelations = [
		'category' => ['name'],
	];

	protected $relationDetails = [
		'category' => [
			'table' => 'categories',
			'local_key' => 'id',
			'foreign_key' => 'category_id',
		],
	];

	public function getRouteKeyName()
	{
		return 'slug';
	}

	public function category()
	{
		return $this->belongsTo(Category::class);
	}

	public function tickets()
	{
		return $this->hasMany(Ticket::class);
	}
}
