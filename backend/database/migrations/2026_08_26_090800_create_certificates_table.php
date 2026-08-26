<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('certificates', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')->constrained('student_accounts')->cascadeOnDelete();
            // Same reasoning as enrollments.category_id: don't silently
            // wipe issued-certificate history when a course is deleted.
            $table->foreignId('category_id')->constrained('categories')->restrictOnDelete();
            $table->foreignId('enrollment_id')->constrained('enrollments')->cascadeOnDelete();
            $table->string('certificate_number')->unique();
            $table->timestamp('issued_at')->useCurrent();
            $table->string('file_path')->nullable();
            $table->timestamps();

            $table->unique(['student_id', 'category_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('certificates');
    }
};
