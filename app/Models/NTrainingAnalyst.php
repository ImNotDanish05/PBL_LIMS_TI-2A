<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NTrainingAnalyst extends Model
{
    use HasFactory;

    protected $fillable = [
        'analyst_id',
        'training_id',
    ];

    public function analysts()
    {
        return $this->belongsTo(Analyst::class, 'analyst_id');
    }

    public function trainings()
    {
        return $this->belongsTo(Training::class, 'training_id');
    }
}
