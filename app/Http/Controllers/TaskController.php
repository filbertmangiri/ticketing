<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Resources\TaskResource;
use App\Http\Requests\Task\StoreTaskRequest;
use App\Http\Requests\Task\UpdateTaskRequest;
use App\Http\Resources\TaskCommentResource;

class TaskController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Task::class);
    }

    public function index(Request $request)
    {
        $technicians = fn () => User::permission('support assigned task')->get();

        $builder = Task::query();

        if ($request->user()->cannot('view any task')) {
            if ($request->user()->can('view assigned task')) {
                $builder = $builder->whereRelation('technician', 'id', $request->user()->id);
            } elseif ($request->user()->can('create task')) {
                $builder = $builder->whereRelation('issuer', 'id', $request->user()->id);
            }
        }

        $builder = $builder->filterWithPagination('', [], [], [], [], 10, 'number-desc');

        $additional = Task::filterAdditional($builder);

        $tasks = fn () => TaskResource::collection($builder)->additional($additional);

        return inertia('Tasks/Index', compact('tasks', 'technicians'));
    }

    public function create()
    {
        $technicians = fn () => User::permission('support assigned task')->get();

        return inertia('Tasks/Create', compact('technicians'));
    }

    public function store(StoreTaskRequest $request)
    {
        $validated = $request->validated();

        // exclude attachments
        $task = Task::create(
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

        $task->attachments()->createMany($attachments);

        return to_route('task.show', $task->number)->with('alert', [
            'type' => 'success',
            'message' => 'Task successfully posted',
        ]);
    }

    public function show(Task $task)
    {
        $task = fn () => new TaskResource($task->load('issuer', 'issuer.subDepartment', 'issuer.subDepartment.department', 'technician', 'attachments', 'progresses'));
        $technicians = fn () => User::permission('support assigned task')->get();
        $comments = fn () => TaskCommentResource::collection($task()->comments->where('parent_id', null)->sortByDesc('created_at'));

        return inertia('Tasks/Show', compact('task', 'technicians', 'comments'));
    }

    public function update(UpdateTaskRequest $request, Task $task)
    {
        $validated = $request->validated();

        $task->update($validated);
    }

    public function destroy(Task $task)
    {
        //
    }

    public function solved(Request $request, Task $task)
    {
        $this->authorize('solved', $task);

        $task->update([
            'solved_at' => now(),
        ]);
    }

    public function close(Request $request, Task $task)
    {
        $this->authorize('close', $task);

        $task->update([
            'closed_at' => now(),
        ]);
    }

    public function reopen(Request $request, Task $task)
    {
        $this->authorize('close', $task);

        $task->update([
            'closed_at' => null,
        ]);
    }

    public function createProgress(Request $request, Task $task)
    {
        $this->authorize('createProgress', [Task::class, $task]);

        $request->merge([
            'value' => $request->value['value'],
        ]);

        $validated = $request->validate([
            'value' => ['required', 'integer', 'min:0', 'max:100', function ($attribute, $value, $fail) use ($task) {
                if ($value <= $task->progress) {
                    $fail('Progress value must be greater than the last progress value.');
                }
            }],
            'description' => ['required', 'string', 'min:5', 'max:1000'],
        ]);

        $task->progresses()->create($validated);

        if ($validated['value'] == 100) {
            $task->update([
                'closed_at' => now(),
            ]);
        }

        $task->update([
            'progress' => $validated['value'],
        ]);
    }
}
