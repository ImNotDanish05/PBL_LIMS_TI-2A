<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Training;
use Illuminate\Http\Request;

class TrainingController extends Controller
{
    public function index()
    {
        try {
            $trainings = Training::all();
            return response()->json($trainings, 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to fetch trainings.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function show($id)
    {
        try {
            $training = Training::find($id);

            if (!$training) {
                return response()->json(['message' => 'Training not found.'], 404);
            }

            return response()->json($training, 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to fetch training.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'provider' => ['required', 'string', 'max:255'],
            'date' => ['required', 'date'],
            'result' => ['required', 'string', 'max:255'],
        ]);

        try {
            $training = Training::create($validated);
            return response()->json($training, 201);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to create training.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $training = Training::find($id);

        if (!$training) {
            return response()->json(['message' => 'Training not found.'], 404);
        }

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'provider' => ['required', 'string', 'max:255'],
            'date' => ['required', 'date'],
            'result' => ['required', 'string', 'max:255'],
        ]);

        try {
            $training->update($validated);
            return response()->json($training, 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to update training.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $training = Training::find($id);

            if (!$training) {
                return response()->json(['message' => 'Training not found.'], 404);
            }

            $training->delete();

            return response()->json(['message' => 'Training deleted successfully.'], 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to delete training.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}

