<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Equipment extends Model
{
    use HasFactory;

    protected $table = 'equipments';
    public $timestamps = true;

    /**
     * Atribut yang dapat diisi secara massal.
     */
    protected $fillable = [
        'brand_type_id',
        'name',
        'serial_number',
        'purchase_year',
        'calibration_schedule',
        'status',
        'location',
    ];

    public function brand_types()
    {
        return $this->belongsTo(BrandType::class, 'brand_type_id');
    }

    public function n_parameter_methods()
    {
        return $this->belongsToMany(NParameterMethod::class, 'n_equipments', 'equipment_id', 'n_parameter_method_id');
    }
}
