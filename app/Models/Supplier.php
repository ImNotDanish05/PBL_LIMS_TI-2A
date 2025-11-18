<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Supplier extends Model
{
    use HasFactory;

    protected $table = 'suppliers';
    public $timestamps = true;

    protected $fillable = [
        'name',
        'contact_person',
        'phone_number',
        'address',
    ];

    public function reagents()
    {
        return $this->hasMany(Reagent::class, 'supplier_id');
    }
}