<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Enrollment extends Model
{
    use HasFactory;

    protected $table = 'enrollments';

    protected $fillable = [
        'student_id',
        'category_id',
        'enrolled_at',
        'status',
        'completed_at',
        'progress_percent',
    ];

    protected $casts = [
        'enrolled_at' => 'datetime',
        'completed_at' => 'datetime',
    ];

    public function student()
    {
        return $this->belongsTo(StudentAccounts::class, 'student_id');
    }

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    public function lessonProgress()
    {
        return $this->hasMany(LessonProgress::class, 'enrollment_id');
    }

    public function certificate()
    {
        return $this->hasOne(Certificate::class, 'enrollment_id');
    }
}
