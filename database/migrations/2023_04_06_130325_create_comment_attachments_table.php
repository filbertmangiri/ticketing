<?php

use App\Models\Comment;
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
        Schema::create('comment_attachments', function (Blueprint $table) {
            $table->id();

            $table->string('path');
            $table->string('name');
            $table->string('mime_type');
            $table->unsignedBigInteger('size');

            $table->foreignIdFor(Comment::class, 'comment_id')->constrained()->cascadeOnDelete();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('comment_attachments');
    }
};
