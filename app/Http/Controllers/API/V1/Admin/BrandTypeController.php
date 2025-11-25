<?php

namespace App\Http\Controllers\API\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\BrandType;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;

class BrandTypeController extends Controller
{
    /**
     * Tampilkan semua tipe merek.
     */
    public function index()
    {
        try {
            $brands = BrandType::all();

            return response()->json($brands);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Terjadi kesalahan saat mengambil data.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Simpan tipe merek baru.
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255|unique:brand_types,name',
            ]);

            $brandType = BrandType::create($validated);

            return response()->json([
                'message' => 'Tipe Merek berhasil dibuat.',
                'data'    => $brandType,
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
     * Perbarui tipe merek berdasarkan ID.
     */
    public function update(Request $request, $id)
    {
        try {
            $brandType = BrandType::findOrFail($id);

            $validated = $request->validate([
                'name' => [
                    'required',
                    'string',
                    'max:255',
                    Rule::unique('brand_types')->ignore($brandType->id),
                ],
            ]);

            $brandType->update($validated);

            return response()->json([
                'message' => 'Tipe Merek berhasil diperbarui.',
                'data'    => $brandType,
            ], 200);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validasi gagal.',
                'errors'  => $e->errors(),
            ], 422);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Tipe Merek tidak ditemukan.',
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Terjadi kesalahan pada server.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Hapus tipe merek berdasarkan ID.
     */
    public function destroy($id)
    {
        try {
            $brandType = BrandType::findOrFail($id);
            $brandType->delete();

            return response()->json([
                'message' => 'Tipe Merek berhasil dihapus.',
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Tipe Merek tidak ditemukan.',
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Terjadi kesalahan pada server.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }
}
