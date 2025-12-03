<?php

namespace App\Http\Controllers\API\V1\Manager;

use App\Http\Controllers\Controller;
use App\Models\TestParameter;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class ParameterController extends Controller
{
    /**
     * Menampilkan semua data Parameter Uji.
     */
    public function index()
    {
        try {
            $parameters = TestParameter::with(['unit_values', 'reference_standards'])->get();

            if ($parameters->isEmpty()) {
                return response()->json([]);
            }

            return response()->json($parameters);

        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Data parameter uji tidak ditemukan.',
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Terjadi kesalahan saat mengambil data parameter uji.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
