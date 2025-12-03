<?php

namespace App\Http\Controllers\API\V1\Manager;

use App\Http\Controllers\Controller;
use App\Models\SampleCategory;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Exception;

class SampleCategoryController extends Controller
{
    public function index()
    {
        try {
            $categories = SampleCategory::all();

            return response()->json($categories);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil daftar kategori sampel.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
