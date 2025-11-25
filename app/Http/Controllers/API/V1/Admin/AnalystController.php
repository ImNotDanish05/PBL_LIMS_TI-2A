<?php

namespace App\Http\Controllers\API\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\Analyst;
use Illuminate\Http\Request;

class AnalystController extends Controller
{
    public function index()
    {
        try {
            $analysts = Analyst::all();

            return response()->json($analysts);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Terjadi kesalahan saat mengambil data.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }
}
