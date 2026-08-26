<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class StudentAccounts extends Model
{
    use HasFactory, HasApiTokens;

    public $timestamps = false;
    protected $table = 'student_accounts';
    protected $fillable = ['student_number', 'full_name', 'password', 'year_level', 'course'];
    protected $hidden = ['password', 'remember_token'];

    public function enrollments()
    {
        return $this->hasMany(Enrollment::class, 'student_id');
    }

    public function lessonProgress()
    {
        return $this->hasMany(LessonProgress::class, 'student_id');
    }

    public function quizAttempts()
    {
        return $this->hasMany(QuizAttempt::class, 'student_id');
    }

    public function certificates()
    {
        return $this->hasMany(Certificate::class, 'student_id');
    }

    public function courseRatings()
    {
        return $this->hasMany(CourseRating::class, 'student_id');
    }

    public function lessonDiscussions()
    {
        return $this->hasMany(LessonDiscussion::class, 'student_id');
    }
}
