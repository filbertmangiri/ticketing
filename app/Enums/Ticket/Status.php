<?php

namespace App\Enums\Ticket;

enum Status: string
{
	case Submitted = 'submitted';
	case Assigned = 'assigned';
	case OnProgress = 'on_progress';

	public function label(): string
	{
		return match ($this) {
			Status::Submitted => 'Submitted',
			Status::Assigned => 'Assigned to technician',
			Status::OnProgress => 'On progress',
		};
	}

	public function level(): int
	{
		return match ($this) {
			Status::Submitted => 1,
			Status::Assigned => 2,
			Status::OnProgress => 3,
		};
	}
}
