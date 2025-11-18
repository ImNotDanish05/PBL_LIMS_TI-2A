<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Reagent;
use Illuminate\Http\Request;

class ReagentController extends Controller
{
    public function index()
    {
        try {
            $reagents = Reagent::all();
            return response()->json($reagents, 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to fetch reagents.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function show($id)
    {
        try {
            $reagent = Reagent::find($id);

            if (!$reagent) {
                return response()->json(['message' => 'Reagent not found.'], 404);
            }

            return response()->json($reagent, 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to fetch reagent.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'supplier_id' => ['required', 'exists:suppliers,id'],
            'grade_id' => ['required', 'exists:grades,id'],
            'name' => ['required', 'string', 'max:255'],
            'formula' => ['required', 'string', 'max:255'],
            'batch_number' => ['required', 'string', 'max:255'],
            'storage_location' => ['required', 'string', 'max:255'],
        ]);

        try {
            $reagent = Reagent::create($validated);
            return response()->json($reagent, 201);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to create reagent.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $reagent = Reagent::find($id);

        if (!$reagent) {
            return response()->json(['message' => 'Reagent not found.'], 404);
        }

        $validated = $request->validate([
            'supplier_id' => ['required', 'exists:suppliers,id'],
            'grade_id' => ['required', 'exists:grades,id'],
            'name' => ['required', 'string', 'max:255'],
            'formula' => ['required', 'string', 'max:255'],
            'batch_number' => ['required', 'string', 'max:255'],
            'storage_location' => ['required', 'string', 'max:255'],
        ]);

        try {
            $reagent->update($validated);
            return response()->json($reagent, 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to update reagent.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $reagent = Reagent::find($id);

            if (!$reagent) {
                return response()->json(['message' => 'Reagent not found.'], 404);
            }

            $reagent->delete();

            return response()->json(['message' => 'Reagent deleted successfully.'], 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to delete reagent.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}

