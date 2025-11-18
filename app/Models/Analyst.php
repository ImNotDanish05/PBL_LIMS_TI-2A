<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Analyst extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'name',
        'specialist',
    ];

    public function users()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function certificates()
    {
        return $this->hasMany(Certificate::class, 'analyst_id');
    }

    public function trainings()
    {
        return $this->belongsToMany(Training::class, 'n_training_analysts', 'analyst_id', 'training_id');
    }

    public function orders()
    {
        return $this->belongsToMany(Order::class, 'n_analysts', 'analyst_id', 'order_id');
    }
}
