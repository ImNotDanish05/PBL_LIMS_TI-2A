<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Training extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'provider',
        'date',
        'result',
    ];

    public function analysts()
    {
        return $this->belongsToMany(Analyst::class, 'n_training_analysts', 'analyst_id', 'training_id');
    }
}