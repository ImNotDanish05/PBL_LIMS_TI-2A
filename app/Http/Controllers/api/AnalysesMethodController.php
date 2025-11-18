<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\AnalysesMethod;
use Illuminate\Http\Request;

class AnalysesMethodController extends Controller
{
    public function index()
    {
        try {
            $analysesMethods = AnalysesMethod::all();
            return response()->json($analysesMethods, 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to fetch analyses methods.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function show($id)
    {
        try {
            $analysesMethod = AnalysesMethod::find($id);

            if (!$analysesMethod) {
                return response()->json(['message' => 'Analyses Method not found.'], 404);
            }

            return response()->json($analysesMethod, 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to fetch analyses method.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'analyses_method' => ['required', 'string', 'max:255'],
            'price' => ['required', 'numeric', 'min:0'],
        ]);

        try {
            $analysesMethod = AnalysesMethod::create($validated);
            return response()->json($analysesMethod, 201);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to create analyses method.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $analysesMethod = AnalysesMethod::find($id);

        if (!$analysesMethod) {
            return response()->json(['message' => 'Analyses Method not found.'], 404);
        }

        $validated = $request->validate([
            'analyses_method' => ['required', 'string', 'max:255'],
            'price' => ['required', 'numeric', 'min:0'],
        ]);

        try {
            $analysesMethod->update($validated);
            return response()->json($analysesMethod, 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to update analyses method.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $analysesMethod = AnalysesMethod::find($id);

            if (!$analysesMethod) {
                return response()->json(['message' => 'Analyses Method not found.'], 404);
            }

            $analysesMethod->delete();

            return response()->json(['message' => 'Analyses Method deleted successfully.'], 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to delete analyses method.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}

