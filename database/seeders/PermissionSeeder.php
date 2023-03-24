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
		Permission::createResources(['user', 'department', 'sub_department', 'category', 'product', 'location', 'priority', 'comment', 'announcement', 'book']);
		Permission::createResource('ticket');
		Permission::create(['name' => 'assign ticket']);
		Permission::create(['name' => 'close ticket']);
		Permission::create(['name' => 'view assigned ticket']);
		Permission::create(['name' => 'support assigned ticket']);
		Permission::create(['name' => 'action closed ticket']);

		/* Roles */
		$super_admin = Role::firstOrCreate(['name' => 'admin']);
		$super_admin->givePermissionTo([
			...Permission::getResourcesNames(['user', 'department', 'sub_department', 'category', 'product', 'location', 'priority', 'comment', 'announcement', 'book']),
			...Permission::getResourceNames('ticket', ['create']),
			'assign ticket',
			'close ticket',
			'action closed ticket',
		]);

		$technician = Role::firstOrCreate(['name' => 'technician']);
		$technician->givePermissionTo([
			'view ticket',
			'view assigned ticket',
			'support assigned ticket',
		]);

		$user = Role::firstOrCreate(['name' => 'user']);
		$user->givePermissionTo(['create ticket']);
	}
}
