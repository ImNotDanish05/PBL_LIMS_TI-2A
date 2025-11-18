<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\NOrderSample;
use Illuminate\Http\Request;

class NOrderSampleController extends Controller
{
    public function index()
    {
        try {
            $records = NOrderSample::all();
            return response()->json($records, 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to fetch order samples.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function show($id)
    {
        try {
            $record = NOrderSample::find($id);

            if (!$record) {
                return response()->json(['message' => 'Order sample not found.'], 404);
            }

            return response()->json($record, 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to fetch order sample.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'order_id' => ['required', 'exists:orders,id'],
            'sample_id' => ['required', 'exists:samples,id'],
            'sample_volume' => ['required', 'string', 'max:255'],
        ]);

        try {
            $record = new NOrderSample();
            $record->order_id = $validated['order_id'];
            $record->sample_id = $validated['sample_id'];
            $record->sample_volume = $validated['sample_volume'];
            $record->save();

            return response()->json($record, 201);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to create order sample.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $record = NOrderSample::find($id);

        if (!$record) {
            return response()->json(['message' => 'Order sample not found.'], 404);
        }

        $validated = $request->validate([
            'order_id' => ['required', 'exists:orders,id'],
            'sample_id' => ['required', 'exists:samples,id'],
            'sample_volume' => ['required', 'string', 'max:255'],
        ]);

        try {
            $record->order_id = $validated['order_id'];
            $record->sample_id = $validated['sample_id'];
            $record->sample_volume = $validated['sample_volume'];
            $record->save();

            return response()->json($record, 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to update order sample.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $record = NOrderSample::find($id);

            if (!$record) {
                return response()->json(['message' => 'Order sample not found.'], 404);
            }

            $record->delete();

            return response()->json(['message' => 'Order sample deleted successfully.'], 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to delete order sample.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}

