<?php

namespace Database\Seeders;

use App\Models\User;
use App\Enums\Gender;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UserSeeder extends Seeder
{
	public function run(): void
	{
		User::create([
			'name' => 'Filbert Mangiri',
			'email' => 'filbert.mangiri@student.umn.ac.id',
			'username' => 'filbertmangiri',
			'gender' => Gender::Male->value,
			'password' => bcrypt('password'),
		])->assignRole(['admin', 'calibration support']);

		User::create([
			'name' => 'User Mangiri',
			'email' => 'user@student.umn.ac.id',
			'username' => 'user',
			'gender' => Gender::Male->value,
			'password' => bcrypt('password'),
			'sub_department_id' => 1,
		])->assignRole('user');

		User::create([
			'name' => 'Technician Mangiri',
			'email' => 'technician@student.umn.ac.id',
			'username' => 'technician',
			'gender' => Gender::Male->value,
			'password' => bcrypt('password'),
		])->assignRole('technician');

		User::factory(50)->create()->each(function (User $user) {
			$user->assignRole('user');
		});
	}
}
