<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Enums\Gender;
use App\Models\Department\Department;
use App\Traits\QueryFilter;
use Laravel\Sanctum\HasApiTokens;
use App\Models\Department\SubDepartment;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
	use HasApiTokens;
	use HasFactory;
	use Notifiable;
	use SoftDeletes;
	use HasRoles;

	use QueryFilter;

	protected $fillable = [
		'name',
		'email',
		'username',
		'phone',
		'gender',
		'profile_picture',
		'sub_department_id',
		'password',
	];

	protected $sortableColumns = [
		'id',
		'name',
		'email',
		'username',
		'phone',
		'gender',
	];

	protected $sortableRelations = [
		'department' => 'name',
		'sub_department' => 'name',
	];

	protected $searchableColumns = [
		'name',
		'email',
		'username',
		'phone',
		'gender',
	];

	protected $searchableRelations = [
		'subDepartment.department' => ['name'],
		'subDepartment' => ['name'],
	];

	protected $relationDetails = [
		'department' => [
			'table' => 'departments',
			'local_key' => 'id',
			'foreign_key' => 'department_id',
			'through' => 'sub_department',
		],
		'sub_department' => [
			'table' => 'sub_departments',
			'local_key' => 'id',
			'foreign_key' => 'sub_department_id',
		],
	];

	protected $hidden = [
		'password',
		'remember_token',
	];

	protected $casts = [
		'email_verified_at' => 'datetime',
		'gender' => Gender::class,
	];

	public static $profile_picture_default = 'profile-pictures/default.jpg';
	public static $profile_picture_default_male = 'profile-pictures/default-male.jpg';
	public static $profile_picture_default_female = 'profile-pictures/default-female.jpg';

	public function getProfilePicture()
	{
		if ($this->profile_picture) {
			return url('storage/' . $this->profile_picture);
		}

		switch ($this->gender) {
			case Gender::Male:
				return url('storage/' . self::$profile_picture_default_male);

			case Gender::Female:
				return url('storage/' . self::$profile_picture_default_female);

			default:
				break;
		}

		return url('storage/' . self::$profile_picture_default);
	}

	public function getRouteKeyName()
	{
		return 'username';
	}

	public function subDepartment()
	{
		return $this->belongsTo(SubDepartment::class);
	}

	public function tickets()
	{
		return $this->hasMany(Ticket::class, 'issuer_id');
	}

	public function getAllPermission()
	{
		$permissions = $this->getAllPermissions();
		$permissionArray = [];
		foreach ($permissions as $permission) {
			$permissionArray[] = $permission->name;
		}
		return $permissionArray;
	}
}
