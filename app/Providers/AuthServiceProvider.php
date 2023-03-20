<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;
use App\Models\Department\Department;
use App\Models\Department\SubDepartment;
use App\Policies\Department\DepartmentPolicy;
use App\Policies\Department\SubDepartmentPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
	/**
	 * The model to policy mappings for the application.
	 *
	 * @var array<class-string, class-string>
	 */
	protected $policies = [
		Department::class => DepartmentPolicy::class,
		SubDepartment::class => SubDepartmentPolicy::class,
	];

	/**
	 * Register any authentication / authorization services.
	 */
	public function boot(): void
	{
		// $this->registerPolicies();
	}
}
