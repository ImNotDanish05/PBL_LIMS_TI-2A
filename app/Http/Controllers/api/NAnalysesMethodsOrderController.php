<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\NAnalysesMethodsOrder;
use Illuminate\Http\Request;

class NAnalysesMethodsOrderController extends Controller
{
    public function index()
    {
        try {
            $records = NAnalysesMethodsOrder::all();
            return response()->json($records, 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to fetch analyses methods orders.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function show($id)
    {
        try {
            $record = NAnalysesMethodsOrder::find($id);

            if (!$record) {
                return response()->json(['message' => 'Analyses Methods Order not found.'], 404);
            }

            return response()->json($record, 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to fetch analyses methods order.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'order_id' => ['required', 'exists:orders,id'],
            'analyses_method_id' => ['required', 'exists:analyses_methods,id'],
            'description' => ['required', 'string', 'max:255'],
            'price' => ['required', 'numeric', 'min:0'],
        ]);

        try {
            $record = new NAnalysesMethodsOrder();
            $record->order_id = $validated['order_id'];
            $record->analyses_method_id = $validated['analyses_method_id'];
            $record->description = $validated['description'];
            $record->price = $validated['price'];
            $record->save();

            return response()->json($record, 201);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to create analyses methods order.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $record = NAnalysesMethodsOrder::find($id);

        if (!$record) {
            return response()->json(['message' => 'Analyses Methods Order not found.'], 404);
        }

        $validated = $request->validate([
            'order_id' => ['required', 'exists:orders,id'],
            'analyses_method_id' => ['required', 'exists:analyses_methods,id'],
            'description' => ['required', 'string', 'max:255'],
            'price' => ['required', 'numeric', 'min:0'],
        ]);

        try {
            $record->order_id = $validated['order_id'];
            $record->analyses_method_id = $validated['analyses_method_id'];
            $record->description = $validated['description'];
            $record->price = $validated['price'];
            $record->save();

            return response()->json($record, 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to update analyses methods order.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $record = NAnalysesMethodsOrder::find($id);

            if (!$record) {
                return response()->json(['message' => 'Analyses Methods Order not found.'], 404);
            }

            $record->delete();

            return response()->json(['message' => 'Analyses Methods Order deleted successfully.'], 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to delete analyses methods order.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}

