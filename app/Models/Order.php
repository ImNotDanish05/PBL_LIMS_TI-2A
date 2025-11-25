<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;



class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'client_id',
        'order_number',
        'title',
        'result_value',
        'order_date',
        'estimate_date',
        'report_issued_at',
        'report_file_path',
        'notes',
        'order_type',
        'status'
    ];

    protected $casts = [
        'estimate_date' => 'date',
        'report_issued_at' => 'datetime',
        'order_date' => 'date',
        'result_value' => 'float',
    ];

    public function analysesMethods()
    {
        return $this->belongsToMany(
            AnalysesMethod::class,
            'n_analyses_methods_orders',
            'order_id',
            'analyses_method_id'
        )->withPivot('description', 'price')
         ->withTimestamps();
    }

    public function analysesMethodsOrders()
    {
        return $this->hasMany(NAnalysesMethodsOrder::class, 'order_id');
    }

    public function samples()
    {
        return $this->belongsToMany(
            Sample::class,
            'n_order_samples',
            'order_id',
            'sample_id'
        )->withPivot('sample_volume', 'created_at', 'updated_at');
    }

    public function client()
    {
        return $this->belongsTo(Client::class, 'client_id');
    }

    // Backwards compatibility for existing eager loads
    public function clients()
    {
        return $this->client();
    }

    public function analysts()
    {
        return $this->belongsToMany(Analyst::class, 'n_analysts', 'order_id', 'analyst_id');
    }
}
