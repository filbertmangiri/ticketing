<?php

namespace App\Http\Controllers;

use App\Enums\Calibration\Status;
use App\Http\Requests\Calibration\AssignCalibrationRequest;
use App\Models\Calibration;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\Department\Department;
use App\Http\Resources\CalibrationResource;
use App\Http\Requests\Calibration\StoreCalibrationRequest;
use App\Http\Requests\Calibration\UpdateCalibrationRequest;
use App\Http\Resources\CalibrationCommentResource;
use App\Models\Category;

class CalibrationController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Calibration::class);
    }

    public function index(Request $request)
    {
        $builder = Calibration::query();

        if ($request->user()->cannot('view any calibration')) {
            $builder = $builder->whereRelation('department', 'id', $request->user()?->subDepartment?->department?->id);
        }

        $builder = $builder->filterWithPagination('', [], [], [], [], 10, 'number-desc');

        $additional = Calibration::filterAdditional($builder);

        $calibrations = fn () => CalibrationResource::collection($builder)->additional($additional);

        return inertia('Calibrations/Index', compact('calibrations'));
    }

    public function create()
    {
        $departments = fn () => Department::all();
        $categories = fn () => Category::select('id', 'name')->get();

        return inertia('Calibrations/Create', compact('departments', 'categories'));
    }

    public function store(StoreCalibrationRequest $request)
    {
        $validated = $request->validated();

        // exclude attachments
        $calibration = Calibration::create(
            array_diff_key(
                $validated,
                array_flip(['attachments'])
            )
        );

        $attachments = [];

        foreach ($validated['attachments'] as $file) {
            $attachments[] = [
                'path' => $file->storeAs('attachments', date('Ymd') . '-' . Str::uuid() . '.' . $file->getClientOriginalExtension()),
                'name' => $file->getClientOriginalName(),
                'mime_type' => $file->getMimeType(),
                'size' => $file->getSize(),
            ];
        }

        $calibration->attachments()->createMany($attachments);

        return to_route('calibration.show', $calibration->number)->with('alert', [
            'type' => 'success',
            'message' => 'Calibration successfully posted',
        ]);
    }

    public function show(Calibration $calibration)
    {
        $calibration = fn () => new CalibrationResource($calibration->load('issuer', 'issuer.subDepartment', 'issuer.subDepartment.department', 'department', 'attachments', 'progresses'));
        $departments = fn () => Department::all();
        $comments = fn () => CalibrationCommentResource::collection($calibration()->comments->where('parent_id', null)->sortByDesc('created_at'));

        return inertia('Calibrations/Show', compact('calibration', 'departments', 'comments'));
    }

    public function assign(AssignCalibrationRequest $request, Calibration $calibration)
    {
        $this->authorize('assign', $calibration);

        $validated = $request->validated();

        $validated['status'] = Status::Assigned;

        $calibration->progresses()->create([
            'description' => $validated['description'],
            'is_assign' => true,
        ]);

        unset($validated['description']);

        $calibration->update($validated);

        return redirect()->route('calibration.index');
    }

    public function update(UpdateCalibrationRequest $request, Calibration $calibration)
    {
        $validated = $request->validated();

        $calibration->update($validated);
    }

    public function destroy(Calibration $calibration)
    {
        //
    }

    public function close(Request $request, Calibration $calibration)
    {
        $this->authorize('close', $calibration);

        $calibration->update([
            'closed_at' => now(),
        ]);
    }

    public function reopen(Request $request, Calibration $calibration)
    {
        $this->authorize('close', $calibration);

        $calibration->update([
            'closed_at' => null,
        ]);
    }

    public function createProgress(Request $request, Calibration $calibration)
    {
        $this->authorize('createProgress', [Calibration::class, $calibration]);

        $validated = $request->validate([
            'description' => ['required', 'string', 'min:5', 'max:1000'],
        ]);

        $calibration->progresses()->create($validated);
    }
}
