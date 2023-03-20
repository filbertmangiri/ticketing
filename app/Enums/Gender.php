<?php

namespace App\Enums;

enum Gender: string
{
	case Male = 'male';
	case Female = 'female';

	public function label(): string
	{
		return match ($this) {
			Gender::Male => 'Male',
			Gender::Female => 'Female',
		};
	}
}
