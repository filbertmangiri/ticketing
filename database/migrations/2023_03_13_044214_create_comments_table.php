<?php

use App\Models\Comment;
use App\Models\Ticket;
use App\Models\User;
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
		Schema::create('comments', function (Blueprint $table) {
			$table->id();

			$table->foreignIdFor(User::class, 'author_id')->nullable()->constrained('users')->nullOnDelete();
			$table->string('author_name');

			$table->foreignIdFor(Comment::class, 'parent_id')->nullable()->constrained('comments')->cascadeOnDelete();

			$table->foreignIdFor(Ticket::class, 'ticket_id')->constrained()->cascadeOnDelete();

			$table->text('body');

			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		Schema::dropIfExists('comments');
	}
};
