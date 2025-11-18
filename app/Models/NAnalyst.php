<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NAnalyst extends Model
{
    use HasFactory;

    protected $table = 'n_analysts';

    protected $fillable = [
        'analyst_id',
        'order_id',
    ];

    public function analyst()
    {
        return $this->belongsTo(Analyst::class, 'analyst_id');
    }

    public function order()
    {
        return $this->belongsTo(Order::class, 'order_id');
    }
}

