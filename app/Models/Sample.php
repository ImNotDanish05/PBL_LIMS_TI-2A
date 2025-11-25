<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Sample extends Model
{
    use HasFactory;

    protected $table = 'samples';

    protected $fillable = [
        'sample_category_id',
        'name',
        'form',
        'preservation_method',
        'sample_volume',
        'condition',
        'status',
        'storage_condition',
    ];

    public function sampleCategory()
    {
        return $this->belongsTo(SampleCategory::class, 'sample_category_id');
    }

    // Backwards compatibility for existing eager loads
    public function sample_categories()
    {
        return $this->sampleCategory();
    }

    public function orderSamples()
    {
        return $this->hasMany(NOrderSample::class, 'sample_id');
    }

    // Backwards compatibility
    public function n_order_samples()
    {
        return $this->orderSamples();
    }

    public function parameterMethods()
    {
        return $this->hasMany(NParameterMethod::class, 'sample_id');
    }

    // Backwards compatibility
    public function n_parameter_methods()
    {
        return $this->parameterMethods();
    }

    public function orders()
    {
        return $this->belongsToMany(
            Order::class,
            'n_order_samples',
            'sample_id',
            'order_id'
        )->withPivot('sample_volume', 'created_at', 'updated_at');
    }
}
