<?php

namespace App\Http\Controllers\API\V1\Admin;

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

    /**
     * Simpan reference standard baru.
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255|unique:reference_standards,name',
            ]);

            $reference = ReferenceStandard::create($validated);

            return response()->json([
                'message' => 'Reference standard berhasil ditambahkan.',
                'data'    => $reference,
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
     * Perbarui reference standard.
     */
    public function update(Request $request, $id)
    {
        try {
            $reference = ReferenceStandard::findOrFail($id);

            $validated = $request->validate([
                'name' => [
                    'required',
                    'string',
                    'max:255',
                    Rule::unique('reference_standards', 'name')->ignore($reference->id),
                ],
            ]);

            $reference->update($validated);

            return response()->json([
                'message' => 'Reference standard berhasil diperbarui.',
                'data'    => $reference,
            ], 200);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validasi gagal.',
                'errors'  => $e->errors(),
            ], 422);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Reference standard tidak ditemukan.',
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Terjadi kesalahan pada server.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Hapus reference standard.
     */
    public function destroy($id)
    {
        try {
            $reference = ReferenceStandard::findOrFail($id);
            $reference->delete();

            return response()->json([
                'message' => 'Reference standard berhasil dihapus.',
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Reference standard tidak ditemukan.',
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Terjadi kesalahan pada server.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }
}
