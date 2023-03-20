<?php

use App\Enums\Ticket\Status;
use App\Models\Location;
use App\Models\Priority;
use App\Models\Product;
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
		Schema::create('tickets', function (Blueprint $table) {
			$table->id();

			$table->string('number')->unique();
			$table->string('title');
			$table->longText('body')->fulltext();

			$table->string('status')->default(Status::Submitted->value);

			$table->foreignIdFor(Priority::class, 'priority_id')->nullable()->constrained()->nullOnDelete();
			$table->string('priority_name');

			$table->string('category_name');

			$table->foreignIdFor(Product::class, 'product_id')->nullable()->constrained()->nullOnDelete();
			$table->string('product_name');

			$table->foreignIdFor(Location::class, 'location_id')->nullable()->constrained()->nullOnDelete();
			$table->string('location_name');

			$table->foreignIdFor(User::class, 'issuer_id')->nullable()->constrained('users')->nullOnDelete();
			$table->string('issuer_name');

			$table->foreignIdFor(User::class, 'technician_id')->nullable()->constrained('users')->nullOnDelete();
			$table->string('technician_name')->nullable();

			$table->timestamp('deadline_at')->nullable();
			$table->timestamp('solved_at')->nullable();
			$table->timestamp('closed_at')->nullable();

			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		Schema::dropIfExists('tickets');
	}
};
