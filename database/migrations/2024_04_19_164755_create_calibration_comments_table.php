<?php

use App\Models\Calibration;
use App\Models\CalibrationComment;
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
        Schema::create('calibration_comments', function (Blueprint $table) {
            $table->id();

            $table->foreignIdFor(User::class, 'author_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('author_name');

            $table->foreignIdFor(CalibrationComment::class, 'parent_id')->nullable()->constrained('comments')->cascadeOnDelete();

            $table->foreignIdFor(Calibration::class, 'calibration_id')->constrained()->cascadeOnDelete();

            $table->text('body');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('calibration_comments');
    }
};
