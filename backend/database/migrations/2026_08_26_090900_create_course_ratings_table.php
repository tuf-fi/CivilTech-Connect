<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('course_ratings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')->constrained('student_accounts')->cascadeOnDelete();
            // Deliberately restrictOnDelete() — see enrollments migration
            // for the reasoning on why category deletion must not silently
            // wipe student-authored review history.
            $table->foreignId('category_id')->constrained('categories')->restrictOnDelete();
            $table->unsignedTinyInteger('rating');
            $table->text('review')->nullable();
            $table->timestamps();

            $table->unique(['student_id', 'category_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('course_ratings');
    }
};
