<?php

namespace App\Http\Controllers\API\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\UnitValue;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Validation\Rule;

class UnitValueController extends Controller
{
    /**
     * Tampilkan semua unit value.
     */
    public function index()
    {
        try {
            $units = UnitValue::all();

            return response()->json($units);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil data unit value.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Simpan unit value baru.
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'value' => 'required|string|max:255|unique:unit_values,value',
            ]);

            $unitValue = UnitValue::create($validated);

            return response()->json([
                'success' => true,
                'message' => 'Unit value berhasil ditambahkan.',
                'data'    => $unitValue,
            ], 201);
        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal.',
                'errors'  => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan pada server.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Perbarui unit value.
     */
    public function update(Request $request, $id)
    {
        try {
            $unitValue = UnitValue::findOrFail($id);

            $validated = $request->validate([
                'value' => [
                    'required',
                    'string',
                    'max:255',
                    Rule::unique('unit_values', 'value')->ignore($unitValue->id),
                ],
            ]);

            $unitValue->update($validated);

            return response()->json([
                'success' => true,
                'message' => 'Unit value berhasil diperbarui.',
                'data'    => $unitValue,
            ], 200);
        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal.',
                'errors'  => $e->errors(),
            ], 422);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Unit value tidak ditemukan.',
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan pada server.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Hapus unit value.
     */
    public function destroy($id)
    {
        try {
            $unitValue = UnitValue::findOrFail($id);
            $unitValue->delete();

            return response()->json([
                'success' => true,
                'message' => 'Unit value berhasil dihapus.',
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Unit value tidak ditemukan.',
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan pada server.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }
}
