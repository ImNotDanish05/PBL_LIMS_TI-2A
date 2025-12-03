<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Reagent extends Model
{
    use HasFactory;

    protected $table = 'reagents';
    public $timestamps = true;

    /**
     * Atribut yang dapat diisi secara massal.
     */
    protected $fillable = [
        'supplier_id',
        'grade_id',
        'name',
        'formula',
        'batch_number',
        'storage_location',
    ];

    public function suppliers()
    {
        return $this->belongsTo(Supplier::class, 'supplier_id');
    }

    public function grades()
    {
        return $this->belongsTo(Grade::class, 'grade_id');
    }

    public function n_parameter_methods()
    {
        return $this->belongsToMany(NParameterMethod::class, 'n_reagents', 'reagent_id', 'n_parameter_method_id');
    }
}
