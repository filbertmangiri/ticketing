<?php

namespace Database\Factories;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Location>
 */
class LocationFactory extends Factory
{
	protected static int $lastId = 0;

	public function definition(): array
	{
		$name = 'LOCATION-' . ++self::$lastId;

		return [
			'name' => $name,
			'slug' => Str::slug($name),
		];
	}
}
