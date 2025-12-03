<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NOrderSample extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'sample_id',
        'sample_volume',
    ];

    public function orders()
    {
        return $this->belongsTo(Order::class, 'order_id');
    }
    public function samples()
    {
        return $this->belongsTo(Sample::class, 'sample_id');
    }
}
