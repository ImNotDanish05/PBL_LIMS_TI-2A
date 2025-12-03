<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReferenceStandard extends Model
{
    use HasFactory;

    protected $fillable = ['name'];

    public function testParameters()
    {
        return $this->hasMany(TestParameter::class, 'reference_id');
    }

    public function testMethods()
    {
        return $this->hasMany(TestMethod::class, 'reference_id');
    }
}
