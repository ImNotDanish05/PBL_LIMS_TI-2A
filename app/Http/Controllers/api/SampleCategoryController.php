<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\SampleCategory;
use Illuminate\Http\Request;

class SampleCategoryController extends Controller
{
    public function index()
    {
        try {
            $sampleCategories = SampleCategory::all();
            return response()->json($sampleCategories, 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to fetch sample categories.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function show($id)
    {
        try {
            $sampleCategory = SampleCategory::find($id);

            if (!$sampleCategory) {
                return response()->json(['message' => 'Sample Category not found.'], 404);
            }

            return response()->json($sampleCategory, 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to fetch sample category.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
        ]);

        try {
            $sampleCategory = SampleCategory::create($validated);
            return response()->json($sampleCategory, 201);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to create sample category.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $sampleCategory = SampleCategory::find($id);

        if (!$sampleCategory) {
            return response()->json(['message' => 'Sample Category not found.'], 404);
        }

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
        ]);

        try {
            $sampleCategory->update($validated);
            return response()->json($sampleCategory, 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to update sample category.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $sampleCategory = SampleCategory::find($id);

            if (!$sampleCategory) {
                return response()->json(['message' => 'Sample Category not found.'], 404);
            }

            $sampleCategory->delete();

            return response()->json(['message' => 'Sample Category deleted successfully.'], 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to delete sample category.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}

