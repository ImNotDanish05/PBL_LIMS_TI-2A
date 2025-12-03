<?php

namespace App\Http\Controllers\API\V1\Manager;

use App\Http\Controllers\Controller;
use App\Models\Equipment;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class EquipmentController extends Controller
{
    /**
     * Tampilkan semua data peralatan.
     */
    public function index()
    {
        try {
            $equipments = Equipment::with('brand_types')->get();

            return response()->json($equipments, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Terjadi kesalahan saat mengambil data peralatan.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }
}
