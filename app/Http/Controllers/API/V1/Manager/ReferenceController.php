<?php

namespace App\Http\Controllers\API\V1\Manager;

use App\Http\Controllers\Controller;
use App\Models\ReferenceStandard;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Validation\Rule;

class ReferenceController extends Controller
{
    /**
     * Tampilkan semua data reference standard.
     */
    public function index()
    {
        try {
            $references = ReferenceStandard::all();

            return response()->json($references);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Gagal mengambil data reference standard.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }
}
