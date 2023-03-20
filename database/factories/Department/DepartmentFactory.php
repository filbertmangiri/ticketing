<?php

namespace Database\Factories\Department;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Department\Department>
 */
class DepartmentFactory extends Factory
{
	protected static int $lastId = 0;

	public function definition(): array
	{
		$name = 'DPRT-' . ++self::$lastId;

		return [
			'name' => $name,
			'slug' => Str::slug($name),
			'description' => $this->faker->text,
		];
	}
}
