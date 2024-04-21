<?php

use App\Models\Calibration;
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
        Schema::create('calibration_progress', function (Blueprint $table) {
            $table->id();

            $table->foreignIdFor(Calibration::class, 'calibration_id')->constrained()->cascadeOnDelete();

            $table->foreignIdFor(User::class, 'issuer_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('issuer_name');

            $table->string('department_name');

            $table->boolean('is_assign')->default(false);

            $table->text('description');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('calibration_progress');
    }
};
