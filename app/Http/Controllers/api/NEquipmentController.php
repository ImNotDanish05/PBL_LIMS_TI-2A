<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\NEquipment;
use Illuminate\Http\Request;

class NEquipmentController extends Controller
{
    public function index()
    {
        try {
            $records = NEquipment::all();
            return response()->json($records, 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to fetch equipment assignments.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function show($id)
    {
        try {
            $record = NEquipment::find($id);

            if (!$record) {
                return response()->json(['message' => 'Equipment assignment not found.'], 404);
            }

            return response()->json($record, 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to fetch equipment assignment.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'n_parameter_method_id' => ['required', 'exists:n_parameter_methods,id'],
            'equipment_id' => ['required', 'exists:equipments,id'],
        ]);

        try {
            $record = NEquipment::create($validated);
            return response()->json($record, 201);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to create equipment assignment.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $record = NEquipment::find($id);

        if (!$record) {
            return response()->json(['message' => 'Equipment assignment not found.'], 404);
        }

        $validated = $request->validate([
            'n_parameter_method_id' => ['required', 'exists:n_parameter_methods,id'],
            'equipment_id' => ['required', 'exists:equipments,id'],
        ]);

        try {
            $record->update($validated);
            return response()->json($record, 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to update equipment assignment.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $record = NEquipment::find($id);

            if (!$record) {
                return response()->json(['message' => 'Equipment assignment not found.'], 404);
            }

            $record->delete();

            return response()->json(['message' => 'Equipment assignment deleted successfully.'], 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to delete equipment assignment.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}

