<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('enrollments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')
                ->constrained('student_accounts')
                // Preserves existing roster-sync behavior in
                // UploadStudentFileController, which bulk-deletes
                // student_accounts rows not present in the latest uploaded
                // roster file.
                ->cascadeOnDelete();
            $table->foreignId('category_id')
                ->constrained('categories')
                // Deliberately NOT cascadeOnDelete(): deleting a Category
                // must not silently wipe student enrollment/progress
                // history. Forces an explicit failure (FK violation)
                // surfaced through CategoryController@delete's existing
                // try/catch instead of a silent cascade.
                ->restrictOnDelete();
            $table->timestamp('enrolled_at')->useCurrent();
            $table->string('status')->default('active');
            $table->timestamp('completed_at')->nullable();
            $table->unsignedTinyInteger('progress_percent')->default(0);
            $table->timestamps();

            $table->unique(['student_id', 'category_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('enrollments');
    }
};
