<?php

namespace App\Http\Controllers\API\V1\Manager;

use App\Http\Controllers\Controller;
use App\Models\TestMethod;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class TestMethodsController extends Controller
{
    /**
     * Tampilkan semua data test method.
     */
    public function index()
    {
        try {
            $methods = TestMethod::with('reference_standards')->get();

            return response()->json($methods);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Gagal mengambil data metode pengujian.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }
}
