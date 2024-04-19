<?php

use App\Enums\Calibration\Status;
use App\Models\Department\Department;
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
        Schema::create('calibrations', function (Blueprint $table) {
            $table->id();

            $table->string('number')->unique();
            $table->string('title');
            $table->longText('body')->fulltext();

            $table->string('category_name');

            $table->foreignIdFor(Product::class, 'product_id')->nullable()->constrained()->nullOnDelete();
            $table->string('product_name');

            $table->string('status')->default(Status::Assigned->value);

            $table->foreignIdFor(Department::class, 'department_id')->nullable()->constrained()->nullOnDelete();
            $table->string('department_name');

            $table->foreignIdFor(User::class, 'issuer_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('issuer_name');

            $table->timestamp('closed_at')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('calibrations');
    }
};
