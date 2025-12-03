<?php

namespace App\Http\Controllers\API\V1\Manager;

use App\Http\Controllers\Controller;
use App\Models\Training;
use Illuminate\Http\Request;
use Exception;

class TrainingController extends Controller
{
    /**
     * Menampilkan semua training
     */
    public function index()
    {
        try {
            $trainings = Training::all();

            return response()->json($trainings);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Terjadi kesalahan saat mengambil data.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }
}
