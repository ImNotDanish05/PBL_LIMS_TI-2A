<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TestMethod extends Model
{
    use HasFactory;

    protected $fillable = [
        'reference_id',
        'name',
        'applicable_parameter',
        'duration',
        'validity_period'
    ];

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
        return $this->hasMany(NParameterMethod::class, 'test_method_id');
    }

    // Backwards compatibility
    public function n_parameter_methods()
    {
        return $this->parameterMethods();
    }
}
