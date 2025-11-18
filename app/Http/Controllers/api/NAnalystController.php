<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\NAnalyst;
use Illuminate\Http\Request;

class NAnalystController extends Controller
{
    public function index()
    {
        try {
            $records = NAnalyst::all();
            return response()->json($records, 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to fetch analyst assignments.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function show($id)
    {
        try {
            $record = NAnalyst::find($id);

            if (!$record) {
                return response()->json(['message' => 'Analyst assignment not found.'], 404);
            }

            return response()->json($record, 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to fetch analyst assignment.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'analyst_id' => ['required', 'exists:analysts,id'],
            'order_id' => ['required', 'exists:orders,id'],
        ]);

        try {
            $record = NAnalyst::create($validated);
            return response()->json($record, 201);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to create analyst assignment.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $record = NAnalyst::find($id);

        if (!$record) {
            return response()->json(['message' => 'Analyst assignment not found.'], 404);
        }

        $validated = $request->validate([
            'analyst_id' => ['required', 'exists:analysts,id'],
            'order_id' => ['required', 'exists:orders,id'],
        ]);

        try {
            $record->update($validated);
            return response()->json($record, 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to update analyst assignment.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $record = NAnalyst::find($id);

            if (!$record) {
                return response()->json(['message' => 'Analyst assignment not found.'], 404);
            }

            $record->delete();

            return response()->json(['message' => 'Analyst assignment deleted successfully.'], 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to delete analyst assignment.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}

