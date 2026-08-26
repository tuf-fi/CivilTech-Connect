<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('blog_posts', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('body');
            $table->string('cover_image_path')->nullable();
            $table->foreignId('category_id')->nullable()->constrained('categories')->nullOnDelete();
            // Protects authored content from disappearing if the admin
            // user is ever removed; mirrors the restrictOnDelete reasoning
            // used elsewhere in this workstream.
            $table->foreignId('author_id')->constrained('users')->restrictOnDelete();
            $table->timestamp('published_at')->nullable();
            $table->timestamps();

            $table->index('published_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('blog_posts');
    }
};
