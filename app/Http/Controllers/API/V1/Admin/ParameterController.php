<?php

namespace App\Http\Controllers\API\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\TestParameter;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class ParameterController extends Controller
{
    /**
     * Menampilkan semua data Parameter Uji.
     */
    public function index()
    {
        try {
            $parameters = TestParameter::with(['unit_values', 'reference_standards'])->get();

            if ($parameters->isEmpty()) {
                return response()->json([]);
            }

            return response()->json($parameters);

        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Data parameter uji tidak ditemukan.',
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Terjadi kesalahan saat mengambil data parameter uji.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Menyimpan Parameter Uji baru.
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'unit_value_id'    => 'required|exists:unit_values,id',
                'reference_id'     => 'required|exists:reference_standards,id',
                'name'             => 'required|string|max:255|unique:test_parameters,name',
                'category'         => 'required|in:kimia,mikrobiologi,fisika,klinik',
                'detection_limit'  => 'required|in:LOD,LOQ',
                'quality_standard' => 'required|string|max:255',
            ]);

            $parameter = TestParameter::create($validated);

            return response()->json([
                'message' => 'Parameter uji berhasil ditambahkan.',
                'data'    => $parameter->load(['unit_values', 'reference_standards']),
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
     * Memperbarui Parameter Uji.
     */
    public function update(Request $request, $id)
    {
        try {
            $parameter = TestParameter::findOrFail($id);

            $validated = $request->validate([
                'unit_value_id'    => 'sometimes|exists:unit_values,id',
                'reference_id'     => 'sometimes|exists:reference_standards,id',
                'name'             => 'sometimes|string|max:255|unique:test_parameters,name,' . $parameter->id,
                'category'         => 'sometimes|in:kimia,mikrobiologi,fisika,klinik',
                'detection_limit'  => 'sometimes|in:LOD,LOQ',
                'quality_standard' => 'sometimes|string|max:255',
            ]);

            $parameter->update($validated);

            return response()->json([
                'message' => 'Parameter uji berhasil diperbarui.',
                'data'    => $parameter->load(['unit_values', 'reference_standards']),
            ], 200);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validasi gagal.',
                'errors'  => $e->errors(),
            ], 422);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Parameter uji tidak ditemukan.',
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Terjadi kesalahan pada server.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Menghapus Parameter Uji.
     */
    public function destroy($id)
    {
        try {
            $parameter = TestParameter::findOrFail($id);
            $parameter->delete();

            return response()->json([
                'message' => 'Parameter uji berhasil dihapus.',
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Parameter uji tidak ditemukan.',
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Terjadi kesalahan pada server.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }
}
