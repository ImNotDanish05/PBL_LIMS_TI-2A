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

    public function n_analyses_methods_orders()
    {
        return $this->hasMany(NAnalysesMethodsOrder::class, 'analyses_method_id');
    }
}
