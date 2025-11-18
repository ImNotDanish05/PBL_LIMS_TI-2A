<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NReagent extends Model
{
    use HasFactory;

    protected $table = 'n_reagents';

    protected $fillable = [
        'n_parameter_method_id',
        'reagent_id',
    ];

    public function parameterMethod()
    {
        return $this->belongsTo(NParameterMethod::class, 'n_parameter_method_id');
    }

    public function reagent()
    {
        return $this->belongsTo(Reagent::class, 'reagent_id');
    }
}

