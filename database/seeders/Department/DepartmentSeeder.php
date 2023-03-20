<?php

namespace Database\Seeders\Department;

use App\Models\Department\Department;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DepartmentSeeder extends Seeder
{
	public function run(): void
	{
		Department::factory(20)->create();
	}
}
