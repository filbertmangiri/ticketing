<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TicketController;

Route::middleware('auth')->group(function () {
	Route::patch('ticket/{ticket}/assign', [TicketController::class, 'assign'])->name('ticket.assign');
	Route::patch('ticket/{ticket}/solved', [TicketController::class, 'solved'])->name('ticket.solved');
	Route::patch('ticket/{ticket}/close', [TicketController::class, 'close'])->name('ticket.close');
	Route::patch('ticket/{ticket}/reopen', [TicketController::class, 'reopen'])->name('ticket.reopen');
	Route::post('ticket/{ticket}/create-progress', [TicketController::class, 'createProgress'])->name('ticket.createProgress');

	Route::resource('ticket', TicketController::class);
});
