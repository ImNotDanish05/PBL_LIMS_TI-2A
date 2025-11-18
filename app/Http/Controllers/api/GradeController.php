<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Grade;
use Illuminate\Http\Request;

class GradeController extends Controller
{
    public function index()
    {
        try {
            $grades = Grade::all();
            return response()->json($grades, 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to fetch grades.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function show($id)
    {
        try {
            $grade = Grade::find($id);

            if (!$grade) {
                return response()->json(['message' => 'Grade not found.'], 404);
            }

            return response()->json($grade, 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to fetch grade.',
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
            $grade = Grade::create($validated);
            return response()->json($grade, 201);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to create grade.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $grade = Grade::find($id);

        if (!$grade) {
            return response()->json(['message' => 'Grade not found.'], 404);
        }

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
        ]);

        try {
            $grade->update($validated);
            return response()->json($grade, 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to update grade.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $grade = Grade::find($id);

            if (!$grade) {
                return response()->json(['message' => 'Grade not found.'], 404);
            }

            $grade->delete();

            return response()->json(['message' => 'Grade deleted successfully.'], 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to delete grade.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}

