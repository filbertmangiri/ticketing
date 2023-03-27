<?php

namespace App\Http\Controllers\Pages;

use App\Http\Controllers\Controller;
use App\Http\Resources\AnnouncementResource;
use App\Http\Resources\BookResource;
use App\Http\Resources\TicketResource;
use App\Models\Announcement;
use App\Models\Book;
use App\Models\Ticket;
use App\Models\User;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
	public function __invoke(Request $request)
	{
		/* Announcements */
		$announcements = fn () => AnnouncementResource::collection(Announcement::with('author')->latest()->get());

		/* Tickets */
		$builder = Ticket::query();

		if ($request->user()->cannot('view any ticket')) {
			if ($request->user()->can('view assigned ticket')) {
				$builder = $builder->whereRelation('technician', 'id', $request->user()->id);
			} elseif ($request->user()->can('create ticket')) {
				$builder = $builder->whereRelation('issuer', 'id', $request->user()->id);
			}
		}

		$builder = $builder->filterWithPagination('tickets', [], [], [], [], 10, 'number-desc');

		$additional = Ticket::filterAdditional($builder, 'tickets');

		$tickets = fn () => TicketResource::collection($builder)->additional($additional);

		$technicians = fn () => User::permission('support assigned ticket')->get();

		/* Books */
		$builder = Book::filterWithPagination('books');

		$additional = Book::filterAdditional($builder, 'books');

		$books = fn () => BookResource::collection($builder)->additional($additional);

		return inertia('Dashboard/Index', compact('announcements', 'tickets', 'technicians', 'books'));
	}
}
