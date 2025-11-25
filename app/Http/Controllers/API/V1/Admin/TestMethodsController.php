<?php

namespace App\Http\Controllers\API\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\TestMethod;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class TestMethodsController extends Controller
{
    /**
     * Tampilkan semua data test method.
     */
    public function index()
    {
        try {
            $methods = TestMethod::with('reference_standards')->get();

            return response()->json($methods);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Gagal mengambil data metode pengujian.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Simpan data test method baru.
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'reference_id'        => 'required|exists:reference_standards,id',
                'name'                => 'required|string|max:255|unique:test_methods,name',
                'applicable_parameter'=> 'required|string|max:255',
                'duration'            => 'required|integer|min:1',
                'validity_period'     => 'required|date',
            ]);

            $method = TestMethod::create($validated);

            return response()->json([
                'message' => 'Metode pengujian berhasil ditambahkan.',
                'data'    => $method,
            ], 201);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validasi gagal.',
                'errors'  => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Terjadi kesalahan pada server.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Perbarui data test method.
     */
    public function update(Request $request, $id)
    {
        try {
            $method = TestMethod::findOrFail($id);

            $validated = $request->validate([
                'reference_id'        => 'sometimes|exists:reference_standards,id',
                'name'                => 'sometimes|string|max:255|unique:test_methods,name,' . $method->id,
                'applicable_parameter'=> 'sometimes|string|max:255',
                'duration'            => 'sometimes|integer|min:1',
                'validity_period'     => 'sometimes|date',
            ]);

            $method->update($validated);

            return response()->json([
                'message' => 'Metode pengujian berhasil diperbarui.',
                'data'    => $method,
            ], 200);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validasi gagal.',
                'errors'  => $e->errors(),
            ], 422);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Metode pengujian tidak ditemukan.',
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Terjadi kesalahan pada server.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Hapus data test method.
     */
    public function destroy($id)
    {
        try {
            $method = TestMethod::findOrFail($id);
            $method->delete();

            return response()->json([
                'message' => 'Metode pengujian berhasil dihapus.',
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Metode pengujian tidak ditemukan.',
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Terjadi kesalahan pada server.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }
}
