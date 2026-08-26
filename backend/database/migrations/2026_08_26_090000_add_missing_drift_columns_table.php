<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Defensive, idempotent remediation for columns that are referenced in
 * model $fillable / controller code (categories.sort,
 * student_accounts.year_level, student_accounts.course) but have no
 * corresponding migration in this repo's history — they were added to the
 * live database out-of-band. Uses Schema::hasColumn() checks so this is
 * safe to run against a database that already has these columns (e.g. an
 * existing dev DB) as well as a brand-new one built via migrate:fresh.
 *
 * Must run before the new e-learning tables (enrollments, etc.) since
 * those build on top of categories/student_accounts.
 */
return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasColumn('categories', 'sort')) {
            Schema::table('categories', function (Blueprint $table) {
                $table->integer('sort')->nullable();
            });
        }

        if (!Schema::hasColumn('student_accounts', 'year_level')) {
            Schema::table('student_accounts', function (Blueprint $table) {
                $table->string('year_level')->nullable();
            });
        }

        if (!Schema::hasColumn('student_accounts', 'course')) {
            Schema::table('student_accounts', function (Blueprint $table) {
                $table->string('course')->nullable();
            });
        }
    }

    public function down(): void
    {
        // Intentionally a no-op: these columns are load-bearing for existing
        // model/controller code (Category::max('sort'), student roster sync
        // in UploadStudentFileController) and predate this migration in the
        // live database, so dropping them on rollback would be destructive
        // and is not this migration's responsibility.
    }
};
