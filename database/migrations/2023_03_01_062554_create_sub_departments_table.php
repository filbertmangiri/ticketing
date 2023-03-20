<?php

use App\Models\Department\Department;
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
		Schema::create('sub_departments', function (Blueprint $table) {
			$table->id();

			$table->string('name');
			$table->string('slug');
			$table->text('description')->nullable();
			$table->foreignIdFor(Department::class, 'department_id')->constrained()->cascadeOnDelete();

			$table->unique(['slug', 'department_id']);

			$table->timestamps();
			$table->softDeletes();
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		Schema::dropIfExists('sub_departments');
	}
};
