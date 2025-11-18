<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\NParameterMethods;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class NParameterMethodsController extends Controller
{
    public function index()
    {
        try {
            $records = NParameterMethods::all();
            return response()->json($records, 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to fetch parameter methods.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function show($id)
    {
        try {
            $record = NParameterMethods::find($id);

            if (!$record) {
                return response()->json(['message' => 'Parameter method not found.'], 404);
            }

            return response()->json($record, 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to fetch parameter method.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'sample_id' => ['required', 'exists:samples,id'],
            'test_parameter_id' => ['required', 'exists:test_parameters,id'],
            'test_method_id' => ['required', 'exists:test_methods,id'],
            'result' => ['nullable', 'string', 'max:255'],
            'status' => ['required', Rule::in(['failed', 'success'])],
        ]);

        try {
            $record = NParameterMethods::create($validated);
            return response()->json($record, 201);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to create parameter method.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $record = NParameterMethods::find($id);

        if (!$record) {
            return response()->json(['message' => 'Parameter method not found.'], 404);
        }

        $validated = $request->validate([
            'sample_id' => ['required', 'exists:samples,id'],
            'test_parameter_id' => ['required', 'exists:test_parameters,id'],
            'test_method_id' => ['required', 'exists:test_methods,id'],
            'result' => ['nullable', 'string', 'max:255'],
            'status' => ['required', Rule::in(['failed', 'success'])],
        ]);

        try {
            $record->update($validated);
            return response()->json($record, 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to update parameter method.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $record = NParameterMethods::find($id);

            if (!$record) {
                return response()->json(['message' => 'Parameter method not found.'], 404);
            }

            $record->delete();

            return response()->json(['message' => 'Parameter method deleted successfully.'], 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to delete parameter method.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}

