<?php

namespace Database\Factories;

use App\Models\Department\SubDepartment;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
	public function definition(): array
	{
		$gender = fake()->randomElement(['male', 'female']);

		$firstName = fake()->unique()->firstName($gender);
		$lastName = fake()->lastName();

		return [
			'name' => "$firstName $lastName",
			'email' => Str::lower("$firstName.$lastName") . '@example.com',
			'username' => Str::lower("$firstName.$lastName"),
			'phone' => fake()->phoneNumber,
			'gender' => $gender,
			'sub_department_id' => fake()->numberBetween(1, SubDepartment::count()),

			'email_verified_at' => now(),
			'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
			'remember_token' => Str::random(10),
		];
	}

	/**
	 * Indicate that the model's email address should be unverified.
	 */
	public function unverified(): static
	{
		return $this->state(fn (array $attributes) => [
			'email_verified_at' => null,
		]);
	}
}
