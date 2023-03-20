<?php

namespace App\Http\Controllers\Pages;

use App\Http\Controllers\Controller;
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
		return inertia('Dashboard', [
			'tickets' => fn () => Ticket::count(),
			'users' => fn () => User::count(),
			'departments' => fn () => Department::count(),
			'sub_departments' => fn () => SubDepartment::count(),
			'categories' => fn () => Category::count(),
			'products' => fn () => Product::count(),
			'locations' => fn () => Location::count(),
			'priorities' => fn () => Priority::count(),
		]);
	}
}
