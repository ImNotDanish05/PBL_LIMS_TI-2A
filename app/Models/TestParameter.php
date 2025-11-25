<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TestParameter extends Model
{
    use HasFactory;

    protected $fillable = [
        'unit_value_id',
        'reference_id',
        'name',
        'category',
        'detection_limit',
        'quality_standard'
    ];

    public function unitValue()
    {
        return $this->belongsTo(UnitValue::class, 'unit_value_id');
    }

    // Backwards compatibility
    public function unit_values()
    {
        return $this->unitValue();
    }

    public function referenceStandard()
    {
        return $this->belongsTo(ReferenceStandard::class, 'reference_id');
    }

    // Backwards compatibility
    public function reference_standards()
    {
        return $this->referenceStandard();
    }

    public function parameterMethods()
    {
        return $this->hasMany(NParameterMethod::class, 'test_parameter_id');
    }

    // Backwards compatibility
    public function n_parameter_methods()
    {
        return $this->parameterMethods();
    }
}
