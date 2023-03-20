<?php

use App\Models\Ticket;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
	/**
	 * Run the migrations.
	 */
	public function up(): void
	{
		Schema::create('ticket_attachments', function (Blueprint $table) {
			$table->id();

			$table->string('path');
			$table->string('name');
			$table->string('mime_type');
			$table->unsignedBigInteger('size');

			$table->foreignIdFor(Ticket::class, 'ticket_id')->constrained()->cascadeOnDelete();

			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		Schema::dropIfExists('ticket_attachments');
	}
};
