<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NParameterMethod extends Model
{
    use HasFactory;

    protected $fillable = [
        'sample_id',
        'test_parameter_id',
        'test_method_id',
        'result',
        'status',
    ];

    public function sample()
    {
        return $this->belongsTo(Sample::class, 'sample_id');
    }

    // Backwards compatibility
    public function samples()
    {
        return $this->sample();
    }

    public function testParameter()
    {
        return $this->belongsTo(TestParameter::class, 'test_parameter_id');
    }

    // Backwards compatibility
    public function test_parameters()
    {
        return $this->testParameter();
    }

    public function testMethod()
    {
        return $this->belongsTo(TestMethod::class, 'test_method_id');
    }

    // Backwards compatibility
    public function test_methods()
    {
        return $this->testMethod();
    }

    public function equipments()
    {
        return $this->belongsToMany(Equipment::class, 'n_equipments', 'n_parameter_method_id', 'equipment_id');
    }

    public function reagents()
    {
        return $this->belongsToMany(Reagent::class, 'n_reagents', 'n_parameter_method_id', 'reagent_id');
    }
}
