<?php

namespace App\Http\Controllers\API\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\SampleCategory;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Exception;

class SampleCategoryController extends Controller
{
    public function index()
    {
        try {
            $categories = SampleCategory::all();

            return response()->json($categories);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil daftar kategori sampel.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255|unique:sample_categories,name',
            ]);

            $category = SampleCategory::create($validated);

            return response()->json([
                'success' => true,
                'message' => 'Kategori sampel berhasil ditambahkan.',
                'data' => $category,
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal menambahkan kategori sampel.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function show($id)
    {
        try {
            $category = SampleCategory::findOrFail($id);

            return response()->json([
                'success' => true,
                'message' => 'Detail kategori sampel berhasil diambil.',
                'data' => $category,
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Kategori sampel tidak ditemukan.',
                'error' => $e->getMessage()
            ], 404);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $category = SampleCategory::findOrFail($id);

            $validated = $request->validate([
                'name' => [
                    'required',
                    'string',
                    'max:255',
                    Rule::unique('sample_categories')->ignore($category->id),
                ],
            ]);

            $category->update($validated);

            return response()->json([
                'success' => true,
                'message' => 'Kategori sampel berhasil diperbarui.',
                'data' => $category,
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal memperbarui kategori sampel.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $category = SampleCategory::findOrFail($id);
            $category->delete();

            return response()->json([
                'success' => true,
                'message' => 'Kategori sampel berhasil dihapus.',
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal menghapus kategori sampel.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
