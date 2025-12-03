<?php

namespace App\Http\Controllers\API\V1\Manager;

use App\Http\Controllers\Controller;
use App\Models\Reagent;
use Illuminate\Http\Request;
use Exception;

class ReagentController extends Controller
{
    /**
     * Menampilkan daftar semua reagent dengan relasi supplier dan grade.
     */
    public function index()
    {
        try {
            $reagents = Reagent::with(['suppliers', 'grades', 'n_parameter_methods'])->get();

            return response()->json($reagents);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil data reagent.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
