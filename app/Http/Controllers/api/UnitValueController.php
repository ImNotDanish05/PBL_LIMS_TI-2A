<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\UnitValue;
use Illuminate\Http\Request;

class UnitValueController extends Controller
{
    public function index()
    {
        try {
            $unitValues = UnitValue::all();
            return response()->json($unitValues, 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to fetch unit values.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function show($id)
    {
        try {
            $unitValue = UnitValue::find($id);

            if (!$unitValue) {
                return response()->json(['message' => 'Unit Value not found.'], 404);
            }

            return response()->json($unitValue, 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to fetch unit value.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'value' => ['required', 'string', 'max:255'],
        ]);

        try {
            $unitValue = UnitValue::create($validated);
            return response()->json($unitValue, 201);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to create unit value.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $unitValue = UnitValue::find($id);

        if (!$unitValue) {
            return response()->json(['message' => 'Unit Value not found.'], 404);
        }

        $validated = $request->validate([
            'value' => ['required', 'string', 'max:255'],
        ]);

        try {
            $unitValue->update($validated);
            return response()->json($unitValue, 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to update unit value.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $unitValue = UnitValue::find($id);

            if (!$unitValue) {
                return response()->json(['message' => 'Unit Value not found.'], 404);
            }

            $unitValue->delete();

            return response()->json(['message' => 'Unit Value deleted successfully.'], 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to delete unit value.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}

