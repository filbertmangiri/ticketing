<?php

namespace Database\Factories;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
{
	protected static int $lastId = 0;

	public function definition(): array
	{
		$name = 'CAT-' . ++self::$lastId;

		return [
			'name' => $name,
			'slug' => Str::slug($name),
			'description' => $this->faker->text,
		];
	}
}
