<?php

namespace App\Http\Controllers\API\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\Supplier;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class SupplierController extends Controller
{
    /**
     * Tampilkan semua data supplier.
     */
    public function index()
    {
        try {
            $suppliers = Supplier::all();

            return response()->json($suppliers);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Terjadi kesalahan saat mengambil data.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Simpan data supplier baru.
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255|unique:suppliers',
                'contact_person' => 'nullable|string|max:255',
                'phone_number' => 'nullable|string|max:20',
                'address' => 'nullable|string|max:500',
            ]);

            $supplier = Supplier::create($validated);

            return response()->json([
                'message' => 'Supplier berhasil ditambahkan.',
                'data'    => $supplier,
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
     * Perbarui data supplier.
     */
    public function update(Request $request, $id)
    {
        try {
            $supplier = Supplier::findOrFail($id);

            $validated = $request->validate([
                'name' => 'sometimes|string|max:255|unique:suppliers,name,' . $supplier->id,
                'contact_person' => 'nullable|string|max:255',
                'phone_number' => 'nullable|string|max:20',
                'address' => 'nullable|string|max:500',
            ]);

            $supplier->update($validated);

            return response()->json([
                'message' => 'Supplier berhasil diperbarui.',
                'data'    => $supplier,
            ], 200);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validasi gagal.',
                'errors'  => $e->errors(),
            ], 422);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Supplier tidak ditemukan.',
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Terjadi kesalahan pada server.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Hapus data supplier.
     */
    public function destroy($id)
    {
        try {
            $supplier = Supplier::findOrFail($id);
            $supplier->delete();

            return response()->json([
                'message' => 'Supplier berhasil dihapus.',
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Supplier tidak ditemukan.',
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Terjadi kesalahan pada server.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }
}
