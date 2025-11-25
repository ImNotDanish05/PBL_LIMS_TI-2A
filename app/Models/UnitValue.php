<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UnitValue extends Model
{
    use HasFactory;

    protected $fillable = ['value'];

    public function test_parameters()
    {
        return $this->hasMany(TestParameter::class, 'unit_value_id');
    }
}
