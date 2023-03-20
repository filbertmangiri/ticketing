<?php

namespace App\Http\Controllers;

use App\Models\Priority;
use App\Http\Requests\Priority\StorePriorityRequest;
use App\Http\Requests\Priority\UpdatePriorityRequest;
use App\Http\Resources\PriorityResource;

class PriorityController extends Controller
{
	public function __construct()
	{
		$this->authorizeResource(Priority::class);
	}

	public function index()
	{
		$builder = Priority::filterWithPagination('', [], [], [], [], 10, 'deadline_days-desc');

		$additional = Priority::filterAdditional($builder);

		$priorities = fn () => PriorityResource::collection($builder)->additional($additional);

		return inertia('Priorities/Index', compact('priorities'));
	}

	public function store(StorePriorityRequest $request)
	{
		$validated = $request->validated();

		Priority::create($validated);
	}

	public function show(Priority $priority)
	{
		//
	}

	public function update(UpdatePriorityRequest $request, Priority $priority)
	{
		$validated = $request->validated();

		$priority->update($validated);
	}

	public function destroy(Priority $priority)
	{
		$priority->delete();
	}

	public function restore(Priority $priority)
	{
		$priority->restore();
	}

	public function forceDelete(Priority $priority)
	{
		$priority->forceDelete();
	}
}
