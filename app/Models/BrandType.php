<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class BrandType extends Model
{
    use HasFactory;

    protected $table = 'brand_types';
    public $timestamps = false;

    protected $fillable = [
        'name',
    ];

    public function equipments()
    {
        return $this->hasMany(Equipment::class, 'brand_type_id');
    }
}