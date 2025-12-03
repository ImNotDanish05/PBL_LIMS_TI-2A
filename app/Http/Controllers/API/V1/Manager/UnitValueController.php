<?php

namespace App\Http\Controllers\API\V1\Manager;

use App\Http\Controllers\Controller;
use App\Models\UnitValue;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Validation\Rule;

class UnitValueController extends Controller
{
    /**
     * Tampilkan semua unit value.
     */
    public function index()
    {
        try {
            $units = UnitValue::all();

            return response()->json($units);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil data unit value.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }
}
