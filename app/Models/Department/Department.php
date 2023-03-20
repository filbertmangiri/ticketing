<?php

namespace App\Models\Department;

use App\Models\User;
use App\Traits\QueryFilter;
use Illuminate\Database\Eloquent\Model;
use App\Models\Department\SubDepartment;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Department extends Model
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
		'sub_departments_count',
		'users_count',
	];

	protected $searchableColumns = [
		'name',
		'description',
	];

	public function getRouteKeyName()
	{
		return 'slug';
	}

	public function subDepartments()
	{
		return $this->hasMany(SubDepartment::class);
	}

	public function users()
	{
		return $this->hasManyThrough(User::class, SubDepartment::class);
	}
}
