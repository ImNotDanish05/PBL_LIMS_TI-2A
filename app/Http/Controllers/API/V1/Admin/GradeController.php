<?php

namespace App\Http\Controllers\API\V1\Admin;

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

    /**
     * Menyimpan grade baru.
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255|unique:grades,name',
            ]);

            $grade = Grade::create($validated);

            return response()->json([
                'success' => true,
                'message' => 'Grade berhasil dibuat.',
                'data' => $grade,
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal membuat grade.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Menampilkan satu grade berdasarkan ID.
     */
    public function show($id)
    {
        try {
            $grade = Grade::with('reagents')->findOrFail($id);

            return response()->json([
                'success' => true,
                'message' => 'Detail grade berhasil diambil.',
                'data' => $grade,
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil data grade.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Mengupdate grade berdasarkan ID.
     */
    public function update(Request $request, $id)
    {
        try {
            $grade = Grade::findOrFail($id);

            $validated = $request->validate([
                'name' => 'required|string|max:255|unique:grades,name,' . $grade->id,
            ]);

            $grade->update($validated);

            return response()->json([
                'success' => true,
                'message' => 'Grade berhasil diperbarui.',
                'data' => $grade,
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal memperbarui grade.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Menghapus grade berdasarkan ID.
     */
    public function destroy($id)
    {
        try {
            $grade = Grade::findOrFail($id);
            $grade->delete();

            return response()->json([
                'success' => true,
                'message' => 'Grade berhasil dihapus.',
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal menghapus grade.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
