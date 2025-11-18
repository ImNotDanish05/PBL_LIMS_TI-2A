<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class OrderController extends Controller
{
    public function index()
    {
        try {
            $orders = Order::all();
            return response()->json($orders, 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to fetch orders.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function show($id)
    {
        try {
            $order = Order::find($id);

            if (!$order) {
                return response()->json(['message' => 'Order not found.'], 404);
            }

            return response()->json($order, 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to fetch order.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'client_id' => ['required', 'exists:clients,id'],
            'order_number' => ['nullable', 'string', 'max:255'],
            'title' => ['nullable', 'string', 'max:255'],
            'result_value' => ['nullable', 'string', 'max:255'],
            'order_date' => ['required', 'date'],
            'estimate_date' => ['nullable', 'date'],
            'report_issued_at' => ['nullable', 'date'],
            'report_file_path' => ['nullable', 'string', 'max:255'],
            'notes' => ['nullable', 'string', 'max:255'],
            'order_type' => ['required', Rule::in(['internal', 'regular', 'external', 'urgent'])],
            'status' => ['required', Rule::in(['received', 'in_progress', 'pending', 'disapproved', 'approved', 'completed'])],
        ]);

        try {
            $order = Order::create($validated);
            return response()->json($order, 201);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to create order.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $order = Order::find($id);

        if (!$order) {
            return response()->json(['message' => 'Order not found.'], 404);
        }

        $validated = $request->validate([
            'client_id' => ['required', 'exists:clients,id'],
            'order_number' => ['nullable', 'string', 'max:255'],
            'title' => ['nullable', 'string', 'max:255'],
            'result_value' => ['nullable', 'string', 'max:255'],
            'order_date' => ['required', 'date'],
            'estimate_date' => ['nullable', 'date'],
            'report_issued_at' => ['nullable', 'date'],
            'report_file_path' => ['nullable', 'string', 'max:255'],
            'notes' => ['nullable', 'string', 'max:255'],
            'order_type' => ['required', Rule::in(['internal', 'regular', 'external', 'urgent'])],
            'status' => ['required', Rule::in(['received', 'in_progress', 'pending', 'disapproved', 'approved', 'completed'])],
        ]);

        try {
            $order->update($validated);
            return response()->json($order, 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to update order.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $order = Order::find($id);

            if (!$order) {
                return response()->json(['message' => 'Order not found.'], 404);
            }

            $order->delete();

            return response()->json(['message' => 'Order deleted successfully.'], 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to delete order.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}

