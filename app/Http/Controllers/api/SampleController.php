<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Sample;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class SampleController extends Controller
{
    public function index()
    {
        try {
            $samples = Sample::all();
            return response()->json($samples, 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to fetch samples.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function show($id)
    {
        try {
            $sample = Sample::find($id);

            if (!$sample) {
                return response()->json(['message' => 'Sample not found.'], 404);
            }

            return response()->json($sample, 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to fetch sample.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'sample_category_id' => ['required', 'exists:sample_categories,id'],
            'name' => ['required', 'string', 'max:255'],
            'form' => ['required', Rule::in(['solid', 'liquid', 'gas'])],
            'preservation_method' => ['required', 'string', 'max:255'],
            'sample_volume' => ['required', 'numeric', 'min:0'],
            'condition' => ['required', Rule::in(['good', 'damages', 'expired'])],
            'status' => ['required', Rule::in(['in_progress', 'done'])],
            'storage_condition' => ['required', 'string', 'max:255'],
        ]);

        try {
            $sample = Sample::create($validated);
            return response()->json($sample, 201);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to create sample.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $sample = Sample::find($id);

        if (!$sample) {
            return response()->json(['message' => 'Sample not found.'], 404);
        }

        $validated = $request->validate([
            'sample_category_id' => ['required', 'exists:sample_categories,id'],
            'name' => ['required', 'string', 'max:255'],
            'form' => ['required', Rule::in(['solid', 'liquid', 'gas'])],
            'preservation_method' => ['required', 'string', 'max:255'],
            'sample_volume' => ['required', 'numeric', 'min:0'],
            'condition' => ['required', Rule::in(['good', 'damages', 'expired'])],
            'status' => ['required', Rule::in(['in_progress', 'done'])],
            'storage_condition' => ['required', 'string', 'max:255'],
        ]);

        try {
            $sample->update($validated);
            return response()->json($sample, 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to update sample.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $sample = Sample::find($id);

            if (!$sample) {
                return response()->json(['message' => 'Sample not found.'], 404);
            }

            $sample->delete();

            return response()->json(['message' => 'Sample deleted successfully.'], 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to delete sample.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}

