<?php

namespace App\Http\Controllers\API\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\Equipment;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class EquipmentController extends Controller
{
    /**
     * Tampilkan semua data peralatan.
     */
    public function index()
    {
        try {
            $equipments = Equipment::with('brand_types')->get();

            return response()->json($equipments, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Terjadi kesalahan saat mengambil data peralatan.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Simpan data peralatan baru.
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name'                 => 'required|string|max:255|unique:equipments,name',
                'brand_type_id'        => 'required|exists:brand_types,id',
                'serial_number'        => 'nullable|string|max:255',
                'purchase_year'        => 'nullable|date',
                'calibration_schedule' => 'required|in:internal,eksternal',
                'status'               => 'required|in:active,maintenance,broken',
                'location'             => 'nullable|string|max:255',
            ]);

            $equipment = Equipment::create($validated);

            return response()->json([
                'message' => 'Peralatan berhasil ditambahkan.',
                'data'    => $equipment,
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
     * Perbarui data peralatan.
     */
    public function update(Request $request, $id)
    {
        try {
            $equipment = Equipment::findOrFail($id);

            $validated = $request->validate([
                'name'                 => 'sometimes|string|max:255|unique:equipments,name,' . $equipment->id,
                'brand_type_id'        => 'sometimes|exists:brand_types,id',
                'serial_number'        => 'nullable|string|max:255',
                'purchase_year'        => 'nullable|date',
                'calibration_schedule' => 'sometimes|in:internal,eksternal',
                'status'               => 'sometimes|in:active,maintenance,broken',
                'location'             => 'nullable|string|max:255',
            ]);

            $equipment->update($validated);

            return response()->json([
                'message' => 'Data peralatan berhasil diperbarui.',
                'data'    => $equipment,
            ], 200);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validasi gagal.',
                'errors'  => $e->errors(),
            ], 422);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Peralatan tidak ditemukan.',
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Terjadi kesalahan pada server.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Hapus data peralatan.
     */
    public function destroy($id)
    {
        try {
            $equipment = Equipment::findOrFail($id);
            $equipment->delete();

            return response()->json([
                'message' => 'Peralatan berhasil dihapus.',
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Peralatan tidak ditemukan.',
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Terjadi kesalahan pada server.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }
}
