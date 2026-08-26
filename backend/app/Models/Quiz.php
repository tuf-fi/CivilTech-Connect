<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Quiz extends Model
{
    use HasFactory;

    protected $table = 'quizzes';

    protected $fillable = [
        'title',
        'description',
        'category_id',
        'topic_id',
        'passing_score_percent',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    public function topic()
    {
        return $this->belongsTo(Topic::class, 'topic_id');
    }

    public function questions()
    {
        return $this->hasMany(QuizQuestion::class, 'quiz_id')->orderBy('order');
    }

    public function attempts()
    {
        return $this->hasMany(QuizAttempt::class, 'quiz_id');
    }
}
