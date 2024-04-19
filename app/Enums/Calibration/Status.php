<?php

namespace App\Enums\Calibration;

enum Status: string
{
	case Assigned = 'assigned';
	case OnProgress = 'on_progress';

	public function label(): string
	{
		return match ($this) {
			Status::Assigned => 'Assigned',
			Status::OnProgress => 'On progress',
		};
	}

	public function level(): int
	{
		return match ($this) {
			Status::Assigned => 1,
			Status::OnProgress => 2,
		};
	}
}
