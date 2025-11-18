<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\TestParameter;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class TestParameterController extends Controller
{
    public function index()
    {
        try {
            $testParameters = TestParameter::all();
            return response()->json($testParameters, 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to fetch test parameters.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function show($id)
    {
        try {
            $testParameter = TestParameter::find($id);

            if (!$testParameter) {
                return response()->json(['message' => 'Test Parameter not found.'], 404);
            }

            return response()->json($testParameter, 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to fetch test parameter.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'unit_value_id' => ['required', 'exists:unit_values,id'],
            'reference_id' => ['required', 'exists:reference_standards,id'],
            'name' => ['required', 'string', 'max:255'],
            'category' => ['required', Rule::in(['kimia', 'mikrobiologi', 'fisika', 'klinik'])],
            'detection_limit' => ['required', Rule::in(['LOD', 'LOQ'])],
            'quality_standard' => ['required', 'string', 'max:255'],
        ]);

        try {
            $testParameter = TestParameter::create($validated);
            return response()->json($testParameter, 201);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to create test parameter.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $testParameter = TestParameter::find($id);

        if (!$testParameter) {
            return response()->json(['message' => 'Test Parameter not found.'], 404);
        }

        $validated = $request->validate([
            'unit_value_id' => ['required', 'exists:unit_values,id'],
            'reference_id' => ['required', 'exists:reference_standards,id'],
            'name' => ['required', 'string', 'max:255'],
            'category' => ['required', Rule::in(['kimia', 'mikrobiologi', 'fisika', 'klinik'])],
            'detection_limit' => ['required', Rule::in(['LOD', 'LOQ'])],
            'quality_standard' => ['required', 'string', 'max:255'],
        ]);

        try {
            $testParameter->update($validated);
            return response()->json($testParameter, 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to update test parameter.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $testParameter = TestParameter::find($id);

            if (!$testParameter) {
                return response()->json(['message' => 'Test Parameter not found.'], 404);
            }

            $testParameter->delete();

            return response()->json(['message' => 'Test Parameter deleted successfully.'], 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to delete test parameter.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}

