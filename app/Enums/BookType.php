<?php

namespace App\Enums;

enum BookType: string
{
	case EBook = 'ebook';
	case Manual = 'manual';

	public function label(): string
	{
		return match ($this) {
			BookType::EBook => 'E-Book',
			BookType::Manual => 'Manual Book',
		};
	}
}
