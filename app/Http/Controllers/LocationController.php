<?php

namespace App\Http\Controllers;

use App\Models\Location;
use App\Http\Requests\Location\StoreLocationRequest;
use App\Http\Requests\Location\UpdateLocationRequest;
use App\Http\Resources\LocationResource;

class LocationController extends Controller
{
	public function __construct()
	{
		$this->authorizeResource(Location::class);
	}

	public function index()
	{
		$builder = Location::filterWithPagination();

		$additional = Location::filterAdditional($builder);

		$locations = fn () => LocationResource::collection($builder)->additional($additional);

		return inertia('Locations/Index', compact('locations'));
	}

	public function store(StoreLocationRequest $request)
	{
		$validated = $request->validated();

		Location::create($validated);
	}

	public function show(Location $location)
	{
		//
	}

	public function update(UpdateLocationRequest $request, Location $location)
	{
		$validated = $request->validated();

		$location->update($validated);
	}

	public function destroy(Location $location)
	{
		$location->delete();
	}

	public function restore(Location $location)
	{
		$location->restore();
	}

	public function forceDelete(Location $location)
	{
		$location->forceDelete();
	}
}
