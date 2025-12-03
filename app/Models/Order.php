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
    ];

    public function analysesMethods()
    {
        return $this->belongsToMany(
            AnalysesMethod::class,
            'n_analyses_methods_orders', // nama pivot table
            'order_id',                  // foreign key di pivot table
            'analyses_method_id'         // related key di pivot table
        )->withPivot('description', 'price') // kolom tambahan di pivot
         ->withTimestamps();            // jika pivot table memiliki timestamps
    }

    public function samples()
    {
        return $this->belongsToMany(
            Sample::class, 
            'n_order_samples',
            'order_id',
            'sample_id'
            )->withPivot('sample_volume', 'created_at', 'updated_at'); // Tambahkan pivot columns
    }

    public function clients()
    {
        return $this->belongsTo(Client::class, 'client_id');
    }

    public function n_analyses_methods_orders()
    {
        return $this->hasMany(NAnalysesMethodsOrder::class, 'order_id');
    }

    public function n_parameter_methods()
    {
        return $this->hasMany(NParameterMethod::class, 'order_id');
    }

    public function analysts()
    {
        return $this->belongsToMany(Analyst::class, 'n_analysts', 'order_id', 'analyst_id');
    }
}
