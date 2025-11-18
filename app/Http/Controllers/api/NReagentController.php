<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\NReagent;
use Illuminate\Http\Request;

class NReagentController extends Controller
{
    public function index()
    {
        try {
            $records = NReagent::all();
            return response()->json($records, 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to fetch reagent assignments.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function show($id)
    {
        try {
            $record = NReagent::find($id);

            if (!$record) {
                return response()->json(['message' => 'Reagent assignment not found.'], 404);
            }

            return response()->json($record, 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to fetch reagent assignment.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'n_parameter_method_id' => ['required', 'exists:n_parameter_methods,id'],
            'reagent_id' => ['required', 'exists:reagents,id'],
        ]);

        try {
            $record = NReagent::create($validated);
            return response()->json($record, 201);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to create reagent assignment.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $record = NReagent::find($id);

        if (!$record) {
            return response()->json(['message' => 'Reagent assignment not found.'], 404);
        }

        $validated = $request->validate([
            'n_parameter_method_id' => ['required', 'exists:n_parameter_methods,id'],
            'reagent_id' => ['required', 'exists:reagents,id'],
        ]);

        try {
            $record->update($validated);
            return response()->json($record, 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to update reagent assignment.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $record = NReagent::find($id);

            if (!$record) {
                return response()->json(['message' => 'Reagent assignment not found.'], 404);
            }

            $record->delete();

            return response()->json(['message' => 'Reagent assignment deleted successfully.'], 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to delete reagent assignment.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}

