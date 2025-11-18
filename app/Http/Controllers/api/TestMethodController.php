<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\TestMethod;
use Illuminate\Http\Request;

class TestMethodController extends Controller
{
    public function index()
    {
        try {
            $testMethods = TestMethod::all();
            return response()->json($testMethods, 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to fetch test methods.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function show($id)
    {
        try {
            $testMethod = TestMethod::find($id);

            if (!$testMethod) {
                return response()->json(['message' => 'Test Method not found.'], 404);
            }

            return response()->json($testMethod, 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to fetch test method.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'reference_id' => ['required', 'exists:reference_standards,id'],
            'name' => ['required', 'string', 'max:255'],
            'applicable_parameter' => ['required', 'string', 'max:255'],
            'duration' => ['required', 'integer', 'min:0'],
            'validity_period' => ['required', 'date'],
        ]);

        try {
            $testMethod = TestMethod::create($validated);
            return response()->json($testMethod, 201);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to create test method.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $testMethod = TestMethod::find($id);

        if (!$testMethod) {
            return response()->json(['message' => 'Test Method not found.'], 404);
        }

        $validated = $request->validate([
            'reference_id' => ['required', 'exists:reference_standards,id'],
            'name' => ['required', 'string', 'max:255'],
            'applicable_parameter' => ['required', 'string', 'max:255'],
            'duration' => ['required', 'integer', 'min:0'],
            'validity_period' => ['required', 'date'],
        ]);

        try {
            $testMethod->update($validated);
            return response()->json($testMethod, 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to update test method.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $testMethod = TestMethod::find($id);

            if (!$testMethod) {
                return response()->json(['message' => 'Test Method not found.'], 404);
            }

            $testMethod->delete();

            return response()->json(['message' => 'Test Method deleted successfully.'], 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to delete test method.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}

