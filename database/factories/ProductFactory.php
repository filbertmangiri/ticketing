<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
	protected static int $lastId = 0;

	public function definition(): array
	{
		$name = 'PRODUCT-' . ++self::$lastId;

		return [
			'name' => $name,
			'slug' => Str::slug($name),
			'description' => $this->faker->text,
			'category_id' => $this->faker->numberBetween(1, Category::count()),
		];
	}
}
