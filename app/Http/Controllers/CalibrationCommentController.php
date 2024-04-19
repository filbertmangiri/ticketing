<?php

namespace App\Http\Controllers;

use Illuminate\Support\Str;
use App\Enums\Calibration\Status;
use App\Http\Controllers\Controller;
use App\Http\Requests\CalibrationComment\StoreCalibrationCommentRequest;
use App\Http\Requests\CalibrationComment\UpdateCalibrationCommentRequest;
use App\Models\Calibration;
use App\Models\CalibrationComment;

class CalibrationCommentController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(CalibrationComment::class, 'calibrationComment', [
            'except' => ['update', 'destroy'],
        ]);
    }

    public function store(StoreCalibrationCommentRequest $request)
    {
        $validated = $request->validated();

        $calibration = Calibration::findOrFail($validated['calibration_id']);

        $comment = $calibration->comments()->create($validated);

        $attachments = [];

        foreach ($validated['attachments'] as $file) {
            $attachments[] = [
                'path' => $file->storeAs('attachments', date('Ymd') . '-' . Str::uuid() . '.' . $file->getClientOriginalExtension()),
                'name' => $file->getClientOriginalName(),
                'mime_type' => $file->getMimeType(),
                'size' => $file->getSize(),
            ];
        }

        $comment->attachments()->createMany($attachments);

        $calibration->touch();
    }

    public function update(UpdateCalibrationCommentRequest $request, CalibrationComment $comment)
    {
        $this->authorize('update', [$comment, $comment->calibration]);

        $validated = $request->validated();

        $comment->update($validated);

        $calibration = Calibration::findOrFail($validated['calibration_id']);

        $calibration->touch();
    }

    public function destroy(CalibrationComment $comment)
    {
        $this->authorize('delete', [$comment, $comment->calibration]);

        $comment->delete();

        $comment->calibration->touch();
    }
}
