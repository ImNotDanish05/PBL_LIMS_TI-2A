<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NAnalysesMethodsOrder extends Model
{
    use HasFactory;
    protected $fillable = [
        'description',
        'price'
    ];

    public function orders()
    {
        return $this->belongsTo(Order::class, 'order_id');
    }

    public function analyses_methods()
    {
        return $this->belongsTo(AnalysesMethod::class, 'analyses_method_id');
    }
}
