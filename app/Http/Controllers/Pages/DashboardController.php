<?php

namespace App\Http\Controllers\Pages;

use App\Http\Controllers\Controller;
use App\Http\Resources\AnnouncementResource;
use App\Http\Resources\TicketResource;
use App\Models\Announcement;
use App\Models\Category;
use App\Models\Department\Department;
use App\Models\Department\SubDepartment;
use App\Models\Location;
use App\Models\Priority;
use App\Models\Product;
use App\Models\Ticket;
use App\Models\User;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
	public function __invoke(Request $request)
	{
		$technicians = fn () => User::permission('support assigned ticket')->get();

		$builder = Ticket::query();

		if ($request->user()->cannot('view any ticket')) {
			if ($request->user()->can('view assigned ticket')) {
				$builder = $builder->whereRelation('technician', 'id', $request->user()->id);
			} elseif ($request->user()->can('create ticket')) {
				$builder = $builder->whereRelation('issuer', 'id', $request->user()->id);
			}
		}

		$builder = $builder->filterWithPagination('', [], [], [], [], 10, 'number-desc');

		$additional = Ticket::filterAdditional($builder);

		$tickets = fn () => TicketResource::collection($builder)->additional($additional);

		return inertia('Dashboard', [
			'tickets' => $tickets,
			'technicians' => $technicians,
			'users' => fn () => User::count(),
			'departments' => fn () => Department::count(),
			'sub_departments' => fn () => SubDepartment::count(),
			'categories' => fn () => Category::count(),
			'products' => fn () => Product::count(),
			'locations' => fn () => Location::count(),
			'priorities' => fn () => Priority::count(),
			'announcements' => fn () => AnnouncementResource::collection(Announcement::with('author')->latest()->get()),
		]);
	}
}
