<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\BrandType;
use Illuminate\Http\Request;

class BrandTypeController extends Controller
{
    public function index()
    {
        try {
            $brandTypes = BrandType::all();
            return response()->json($brandTypes, 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to fetch brand types.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function show($id)
    {
        try {
            $brandType = BrandType::find($id);

            if (!$brandType) {
                return response()->json(['message' => 'Brand Type not found.'], 404);
            }

            return response()->json($brandType, 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to fetch brand type.',
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
            $brandType = BrandType::create($validated);
            return response()->json($brandType, 201);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to create brand type.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $brandType = BrandType::find($id);

        if (!$brandType) {
            return response()->json(['message' => 'Brand Type not found.'], 404);
        }

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
        ]);

        try {
            $brandType->update($validated);
            return response()->json($brandType, 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to update brand type.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $brandType = BrandType::find($id);

            if (!$brandType) {
                return response()->json(['message' => 'Brand Type not found.'], 404);
            }

            $brandType->delete();

            return response()->json(['message' => 'Brand Type deleted successfully.'], 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to delete brand type.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}

