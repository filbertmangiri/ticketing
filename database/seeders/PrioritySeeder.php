<?php

namespace Database\Seeders;

use App\Models\Priority;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PrioritySeeder extends Seeder
{
	public function run(): void
	{
		Priority::create([
			'name' => 'Low',
			'slug' => 'low',
			'deadline_days' => 4,
		]);

		Priority::create([
			'name' => 'Medium',
			'slug' => 'medium',
			'deadline_days' => 3,
		]);

		Priority::create([
			'name' => 'High',
			'slug' => 'high',
			'deadline_days' => 2,
		]);

		Priority::create([
			'name' => 'Critical',
			'slug' => 'critical',
			'deadline_days' => 1,
		]);
	}
}
