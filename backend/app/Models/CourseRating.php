<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CourseRating extends Model
{
    use HasFactory;

    protected $table = 'course_ratings';

    protected $fillable = [
        'student_id',
        'category_id',
        'rating',
        'review',
    ];

    public function student()
    {
        return $this->belongsTo(StudentAccounts::class, 'student_id');
    }

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }
}
