<?php

namespace App\Http\Controllers\API\V1\Manager;

use App\Http\Controllers\Controller;
use App\Models\Grade;
use Illuminate\Http\Request;
use Exception;

class GradeController extends Controller
{
    /**
     * Menampilkan semua grade.
     */
    public function index()
    {
        try {
            $grades = Grade::with('reagents')->get();

            return response()->json($grades);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil daftar grade.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
