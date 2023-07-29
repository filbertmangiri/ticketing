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

		Permission::createResource('task');
		Permission::createResource('task comment');
		Permission::create(['name' => 'close task']);
		Permission::create(['name' => 'action closed task']);
		Permission::create(['name' => 'get task']);
		Permission::create(['name' => 'view assigned task']);
		Permission::create(['name' => 'support assigned task']);

		Permission::create(['name' => 'reset default password user']);

		/* Roles */
		$super_admin = Role::firstOrCreate(['name' => 'admin']);
		$super_admin->givePermissionTo([
			...Permission::getResourcesNames(['user', 'department', 'sub_department', 'category', 'product', 'location', 'priority', 'comment', 'announcement', 'book']),
			...Permission::getResourceNames('ticket', ['create']),
			...Permission::getResourceNames('task'),
			...Permission::getResourceNames('task comment'),
			'assign ticket',
			'close ticket',
			'action closed ticket',
			'close task',
			'action closed task',
			'get task',
			'reset default password user',
		]);

		$technician = Role::firstOrCreate(['name' => 'technician']);
		$technician->givePermissionTo([
			'view ticket',
			'view assigned ticket',
			'support assigned ticket',
			'view task',
			'view assigned task',
			'support assigned task',
		]);

		$user = Role::firstOrCreate(['name' => 'user']);
		$user->givePermissionTo(['create ticket']);
	}
}
