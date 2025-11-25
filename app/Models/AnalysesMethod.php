<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AnalysesMethod extends Model
{
    use HasFactory;

    protected $fillable = [
        'analyses_method',
        'price',
    ];

    public function analysesMethodsOrders()
    {
        return $this->hasMany(NAnalysesMethodsOrder::class, 'analyses_method_id');
    }

    // Backwards compatibility
    public function n_analyses_methods_orders()
    {
        return $this->analysesMethodsOrders();
    }

    public function orders()
    {
        return $this->belongsToMany(
            Order::class,
            'n_analyses_methods_orders',
            'analyses_method_id',
            'order_id'
        )->withPivot('description', 'price')
         ->withTimestamps();
    }
}
