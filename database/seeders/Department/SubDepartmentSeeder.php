<?php

namespace Database\Seeders\Department;

use App\Models\Department\SubDepartment;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SubDepartmentSeeder extends Seeder
{
	public function run(): void
	{
		SubDepartment::factory(50)->create();
	}
}
