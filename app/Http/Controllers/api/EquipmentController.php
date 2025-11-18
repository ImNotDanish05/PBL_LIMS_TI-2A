<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Equipment;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class EquipmentController extends Controller
{
    public function index()
    {
        try {
            $equipments = Equipment::all();
            return response()->json($equipments, 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to fetch equipments.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function show($id)
    {
        try {
            $equipment = Equipment::find($id);

            if (!$equipment) {
                return response()->json(['message' => 'Equipment not found.'], 404);
            }

            return response()->json($equipment, 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to fetch equipment.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'brand_type_id' => ['required', 'exists:brand_types,id'],
            'name' => ['required', 'string', 'max:255'],
            'serial_number' => ['nullable', 'string', 'max:255'],
            'purchase_year' => ['required', 'date'],
            'calibration_schedule' => ['required', Rule::in(['internal', 'eksternal'])],
            'status' => ['required', Rule::in(['active', 'maintenance', 'broken'])],
            'location' => ['required', 'string', 'max:255'],
        ]);

        try {
            $equipment = Equipment::create($validated);
            return response()->json($equipment, 201);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to create equipment.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $equipment = Equipment::find($id);

        if (!$equipment) {
            return response()->json(['message' => 'Equipment not found.'], 404);
        }

        $validated = $request->validate([
            'brand_type_id' => ['required', 'exists:brand_types,id'],
            'name' => ['required', 'string', 'max:255'],
            'serial_number' => ['nullable', 'string', 'max:255'],
            'purchase_year' => ['required', 'date'],
            'calibration_schedule' => ['required', Rule::in(['internal', 'eksternal'])],
            'status' => ['required', Rule::in(['active', 'maintenance', 'broken'])],
            'location' => ['required', 'string', 'max:255'],
        ]);

        try {
            $equipment->update($validated);
            return response()->json($equipment, 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to update equipment.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $equipment = Equipment::find($id);

            if (!$equipment) {
                return response()->json(['message' => 'Equipment not found.'], 404);
            }

            $equipment->delete();

            return response()->json(['message' => 'Equipment deleted successfully.'], 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to delete equipment.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}

