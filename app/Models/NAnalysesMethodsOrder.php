<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NAnalysesMethodsOrder extends Model
{
    use HasFactory;
    protected $fillable = [
        'order_id',
        'analyses_method_id',
        'description',
        'price'
    ];

    public function order()
    {
        return $this->belongsTo(Order::class, 'order_id');
    }

    // Backwards compatibility
    public function orders()
    {
        return $this->order();
    }

    public function analysesMethod()
    {
        return $this->belongsTo(AnalysesMethod::class, 'analyses_method_id');
    }

    // Backwards compatibility
    public function analyses_methods()
    {
        return $this->analysesMethod();
    }
}
