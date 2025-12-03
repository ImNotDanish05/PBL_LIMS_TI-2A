<?php

namespace App\Http\Controllers\API\V1\Admin;

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

    /**
     * Menambahkan reagent baru.
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'supplier_id' => 'required|exists:suppliers,id',
                'grade_id' => 'required|exists:grades,id',
                'name' => 'required|string|max:255',
                'formula' => 'required|string|max:255',
                'batch_number' => 'required|string|max:255',
                'storage_location' => 'required|string|max:255',
            ]);

            $reagent = Reagent::create($validated);

            return response()->json([
                'success' => true,
                'message' => 'Reagent berhasil dibuat.',
                'data' => $reagent,
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal membuat reagent.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Menampilkan detail reagent berdasarkan ID.
     */
    public function show($id)
    {
        try {
            $reagent = Reagent::with(['suppliers', 'grades', 'n_parameter_methods'])->findOrFail($id);

            return response()->json([
                'success' => true,
                'message' => 'Detail reagent berhasil diambil.',
                'data' => $reagent,
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil data reagent.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Mengupdate reagent berdasarkan ID.
     */
    public function update(Request $request, $id)
    {
        try {
            $reagent = Reagent::findOrFail($id);

            $validated = $request->validate([
                'supplier_id' => 'required|exists:suppliers,id',
                'grade_id' => 'required|exists:grades,id',
                'name' => 'required|string|max:255',
                'formula' => 'required|string|max:255',
                'batch_number' => 'required|string|max:255',
                'storage_location' => 'required|string|max:255',
            ]);

            $reagent->update($validated);

            return response()->json([
                'success' => true,
                'message' => 'Reagent berhasil diperbarui.',
                'data' => $reagent,
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal memperbarui reagent.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Menghapus reagent berdasarkan ID.
     */
    public function destroy($id)
    {
        try {
            $reagent = Reagent::findOrFail($id);
            $reagent->delete();

            return response()->json([
                'success' => true,
                'message' => 'Reagent berhasil dihapus.',
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal menghapus reagent.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
