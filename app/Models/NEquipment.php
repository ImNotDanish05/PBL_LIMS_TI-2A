<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NEquipment extends Model
{
    use HasFactory;

    protected $table = 'n_equipments';

    protected $fillable = [
        'n_parameter_method_id',
        'equipment_id',
    ];

    public function parameterMethod()
    {
        return $this->belongsTo(NParameterMethod::class, 'n_parameter_method_id');
    }

    public function equipment()
    {
        return $this->belongsTo(Equipment::class, 'equipment_id');
    }
}

