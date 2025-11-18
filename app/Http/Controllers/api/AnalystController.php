<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Analyst;
use Illuminate\Http\Request;

class AnalystController extends Controller
{
    public function index()
    {
        try {
            $analysts = Analyst::all();
            return response()->json($analysts, 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to fetch analysts.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function show($id)
    {
        try {
            $analyst = Analyst::find($id);

            if (!$analyst) {
                return response()->json(['message' => 'Analyst not found.'], 404);
            }

            return response()->json($analyst, 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to fetch analyst.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => ['required', 'exists:users,id'],
            'name' => ['required', 'string', 'max:255'],
            'specialist' => ['required', 'string', 'max:255'],
        ]);

        try {
            $analyst = Analyst::create($validated);
            return response()->json($analyst, 201);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to create analyst.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $analyst = Analyst::find($id);

        if (!$analyst) {
            return response()->json(['message' => 'Analyst not found.'], 404);
        }

        $validated = $request->validate([
            'user_id' => ['required', 'exists:users,id'],
            'name' => ['required', 'string', 'max:255'],
            'specialist' => ['required', 'string', 'max:255'],
        ]);

        try {
            $analyst->update($validated);
            return response()->json($analyst, 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to update analyst.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $analyst = Analyst::find($id);

            if (!$analyst) {
                return response()->json(['message' => 'Analyst not found.'], 404);
            }

            $analyst->delete();

            return response()->json(['message' => 'Analyst deleted successfully.'], 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to delete analyst.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}

