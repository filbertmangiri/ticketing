<?php

namespace App\Models\Department;

use App\Models\User;
use App\Models\Department\Department;
use App\Traits\QueryFilter;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class SubDepartment extends Model
{
	use HasFactory;
	use SoftDeletes;

	use QueryFilter;

	protected $fillable = [
		'name',
		'slug',
		'description',
		'department_id',
	];

	protected $sortableColumns = [
		'id',
		'name',
		'users_count',
	];

	protected $sortableRelations = [
		'department' => 'name',
	];

	protected $searchableColumns = [
		'name',
		'description',
	];

	protected $searchableRelations = [
		'department' => ['name'],
	];

	protected $relationDetails = [
		'department' => [
			'table' => 'departments',
			'local_key' => 'id',
			'foreign_key' => 'department_id',
		],
	];

	public function getRouteKeyName()
	{
		return 'slug';
	}

	public function department()
	{
		return $this->belongsTo(Department::class);
	}

	public function users()
	{
		return $this->hasMany(User::class);
	}
}
