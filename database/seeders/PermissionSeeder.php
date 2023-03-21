<?php

namespace Database\Seeders;

use App\Models\Permission;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class PermissionSeeder extends Seeder
{
	public function run(): void
	{
		app()[PermissionRegistrar::class]->forgetCachedPermissions();

		/* Permissions */
		Permission::createResources(['user', 'department', 'sub_department', 'category', 'product', 'location', 'priority', 'comment', 'announcement']);
		Permission::createResource('ticket');
		Permission::create(['name' => 'assign ticket']);
		Permission::create(['name' => 'close ticket']);
		Permission::create(['name' => 'view assigned ticket']);
		Permission::create(['name' => 'support assigned ticket']);
		Permission::create(['name' => 'action closed ticket']);

		/* Roles */
		$super_admin = Role::create(['name' => 'super admin']);
		$super_admin->givePermissionTo([
			...Permission::getResourcesNames(['user', 'department', 'sub_department', 'category', 'product', 'location', 'priority', 'comment', 'announcement']),
			...Permission::getResourceNames('ticket', ['create']),
			'assign ticket',
			'close ticket',
			'action closed ticket',
		]);

		$technician = Role::create(['name' => 'technician']);
		$technician->givePermissionTo([
			'view ticket',
			'view assigned ticket',
			'support assigned ticket',
		]);

		$user = Role::create(['name' => 'user']);
		$user->givePermissionTo(['create ticket']);
	}
}
