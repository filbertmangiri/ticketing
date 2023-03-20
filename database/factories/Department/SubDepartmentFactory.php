<?php

namespace Database\Factories\Department;

use App\Models\Department\Department;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\SubDepartment>
 */
class SubDepartmentFactory extends Factory
{
	protected static int $lastId = 0;

	public function definition(): array
	{
		$name = 'SUB-DPRT-' . ++self::$lastId;

		return [
			'name' => $name,
			'slug' => Str::slug($name),
			'description' => $this->faker->text,
			'department_id' => $this->faker->numberBetween(1, Department::count()),
		];
	}
}
