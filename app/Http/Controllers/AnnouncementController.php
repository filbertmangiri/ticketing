<?php

namespace App\Http\Controllers;

use App\Models\Announcement;
use App\Http\Requests\Announcement\StoreAnnouncementRequest;
use App\Http\Requests\Announcement\UpdateAnnouncementRequest;
use App\Http\Resources\AnnouncementResource;

class AnnouncementController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Announcement::class);
    }

    public function index()
    {
        $builder = Announcement::with('author')->filterWithPagination();

        $additional = Announcement::filterAdditional($builder);

        $announcements = fn () => AnnouncementResource::collection($builder)->additional($additional);

        return inertia('Announcements/Index', compact('announcements'));
    }

    public function store(StoreAnnouncementRequest $request)
    {
        $validated = $request->validated();

        Announcement::create($validated);
    }

    public function show(Announcement $announcement)
    {
        //
    }

    public function update(UpdateAnnouncementRequest $request, Announcement $announcement)
    {
        $validated = $request->validated();

        $announcement->update($validated);
    }

    public function destroy(Announcement $announcement)
    {
        $announcement->delete();
    }
}
