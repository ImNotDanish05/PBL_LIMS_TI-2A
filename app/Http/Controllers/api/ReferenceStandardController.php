<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\ReferenceStandard;
use Illuminate\Http\Request;

class ReferenceStandardController extends Controller
{
    public function index()
    {
        try {
            $referenceStandards = ReferenceStandard::all();
            return response()->json($referenceStandards, 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to fetch reference standards.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function show($id)
    {
        try {
            $referenceStandard = ReferenceStandard::find($id);

            if (!$referenceStandard) {
                return response()->json(['message' => 'Reference Standard not found.'], 404);
            }

            return response()->json($referenceStandard, 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to fetch reference standard.',
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
            $referenceStandard = ReferenceStandard::create($validated);
            return response()->json($referenceStandard, 201);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to create reference standard.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $referenceStandard = ReferenceStandard::find($id);

        if (!$referenceStandard) {
            return response()->json(['message' => 'Reference Standard not found.'], 404);
        }

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
        ]);

        try {
            $referenceStandard->update($validated);
            return response()->json($referenceStandard, 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to update reference standard.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $referenceStandard = ReferenceStandard::find($id);

            if (!$referenceStandard) {
                return response()->json(['message' => 'Reference Standard not found.'], 404);
            }

            $referenceStandard->delete();

            return response()->json(['message' => 'Reference Standard deleted successfully.'], 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to delete reference standard.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}

