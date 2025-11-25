<?php

namespace App\Http\Controllers\API\V1\Admin;

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

    /**
     * Menambahkan training baru
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name'     => 'required|string|max:255',
                'provider' => 'required|string|max:255',
                'date'     => 'required|date',
                'result'   => 'nullable|string|max:255',
            ]);

            $training = Training::create($validated);

            return response()->json([
                'success' => true,
                'message' => 'Training berhasil dibuat.',
                'data'    => $training,
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal membuat training.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Memperbarui training
     */
    public function update(Request $request, $id)
    {
        try {
            $training = Training::findOrFail($id);

            $validated = $request->validate([
                'name'     => 'sometimes|string|max:255',
                'provider' => 'sometimes|string|max:255',
                'date'     => 'sometimes|date',
                'result'   => 'sometimes|string|max:255',
            ]);

            $training->update($validated);

            return response()->json([
                'success' => true,
                'message' => 'Training berhasil diperbarui.',
                'data'    => $training,
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal memperbarui training.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Menghapus training
     */
    public function destroy($id)
    {
        try {
            $training = Training::findOrFail($id);
            $training->delete();

            return response()->json([
                'success' => true,
                'message' => 'Training berhasil dihapus.',
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal menghapus training.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }
}
