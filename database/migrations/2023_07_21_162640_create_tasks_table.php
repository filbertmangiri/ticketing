<?php

use App\Enums\Task\Status;
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
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();

            $table->string('number')->unique();
            $table->string('title');
            $table->longText('body')->fulltext();

            $table->string('status')->default(Status::Assigned->value);
            $table->integer('progress')->default(0);

            $table->foreignIdFor(User::class, 'issuer_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('issuer_name');

            $table->foreignIdFor(User::class, 'technician_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('technician_name')->nullable();

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
        Schema::dropIfExists('tasks');
    }
};
