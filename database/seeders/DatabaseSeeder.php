<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Enums\Gender;
use App\Models\User;
use Illuminate\Database\Seeder;
use Database\Seeders\UserSeeder;
use Database\Seeders\ProductSeeder;
use Database\Seeders\CategorySeeder;
use Database\Seeders\LocationSeeder;
use Database\Seeders\PermissionSeeder;
use Database\Seeders\Department\DepartmentSeeder;
use Database\Seeders\Department\SubDepartmentSeeder;

class DatabaseSeeder extends Seeder
{
	public function run(): void
	{
		$this->call([
			PermissionSeeder::class,
		]);

		if (env('APP_DEBUG', true)) {
			$this->call([
				DepartmentSeeder::class,
				SubDepartmentSeeder::class,
				UserSeeder::class,
				CategorySeeder::class,
				ProductSeeder::class,
				LocationSeeder::class,
				PrioritySeeder::class,
				// AnnouncementSeeder::class,
			]);
		} else {
			User::create([
				'name' => 'Filbert Mangiri',
				'email' => 'filbert.mangiri@student.umn.ac.id',
				'username' => 'filbertmangiri',
				'gender' => Gender::Male->value,
				'password' => bcrypt('password'),
			])->assignRole('admin');
		}
	}
}
