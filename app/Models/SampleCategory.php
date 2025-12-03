<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SampleCategory extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
    ];

    public function samples()
    {
        return $this->hasMany(Sample::class, 'sample_category_id');
    }
}
