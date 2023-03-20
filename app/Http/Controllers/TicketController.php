<?php

namespace App\Http\Controllers;

use App\Enums\Ticket\Status;
use App\Models\User;
use App\Models\Ticket;
use App\Models\Category;
use App\Models\Location;
use App\Models\Priority;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Resources\TicketResource;
use App\Http\Requests\Ticket\StoreTicketRequest;
use App\Http\Requests\Ticket\AssignTicketRequest;
use App\Http\Requests\Ticket\UpdateTicketRequest;
use App\Http\Resources\CommentResource;

class TicketController extends Controller
{
	public function __construct()
	{
		$this->authorizeResource(Ticket::class);
	}

	public function index(Request $request)
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

		return inertia('Tickets/Index', compact('tickets', 'technicians'));
	}

	public function create()
	{
		$categories = fn () => Category::select('id', 'name')->get();
		$locations = fn () => Location::select('id', 'name')->get();
		$priorities = fn () => Priority::select('id', 'name')->orderBy('deadline_days', 'desc')->get();

		return inertia('Tickets/Create', compact('categories', 'locations', 'priorities'));
	}

	public function store(StoreTicketRequest $request)
	{
		$validated = $request->validated();

		// exclude attachments
		$ticket = Ticket::create(
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

		$ticket->attachments()->createMany($attachments);

		return to_route('ticket.show', $ticket->number)->with('alert', [
			'type' => 'success',
			'message' => 'Ticket successfully posted',
		]);
	}

	public function show(Ticket $ticket)
	{
		$ticket = fn () => new TicketResource($ticket->load('issuer', 'issuer.subDepartment', 'issuer.subDepartment.department', 'technician', 'product', 'product.category', 'location', 'priority', 'attachments'));
		$technicians = fn () => User::permission('support assigned ticket')->get();
		$categories = fn () => Category::select('id', 'name')->get();
		$locations = fn () => Location::select('id', 'name')->get();
		$priorities = fn () => Priority::select('id', 'name')->orderBy('deadline_days', 'desc')->get();

		$comments = fn () => CommentResource::collection($ticket()->comments->where('parent_id', null)->sortByDesc('created_at'));

		return inertia('Tickets/Show', compact('ticket', 'technicians', 'categories', 'locations', 'priorities', 'comments'));
	}

	public function update(UpdateTicketRequest $request, Ticket $ticket)
	{
		$validated = $request->validated();

		$ticket->update($validated);
	}

	public function destroy(Ticket $ticket)
	{
		//
	}

	public function assign(AssignTicketRequest $request, Ticket $ticket)
	{
		$this->authorize('assign', $ticket);

		$validated = $request->validated();

		$validated['status'] = Status::Assigned;

		$ticket->update($validated);
	}

	public function solved(Request $request, Ticket $ticket)
	{
		$this->authorize('solved', $ticket);

		$ticket->update([
			'solved_at' => now(),
		]);
	}

	public function close(Request $request, Ticket $ticket)
	{
		$this->authorize('close', $ticket);

		$ticket->update([
			'closed_at' => now(),
		]);
	}

	public function reopen(Request $request, Ticket $ticket)
	{
		$this->authorize('close', $ticket);

		$ticket->update([
			'closed_at' => null,
		]);
	}
}
