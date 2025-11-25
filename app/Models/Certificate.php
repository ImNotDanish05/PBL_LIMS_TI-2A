<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Certificate extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'analyst_id',
        'name',
        'issued_date',
        'expired_date',
        'file_path',
    ];

    public function analyst()
    {
        return $this->belongsTo(Analyst::class, 'analyst_id');
    }
}