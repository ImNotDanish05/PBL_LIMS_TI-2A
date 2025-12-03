<?php

namespace App\Http\Controllers\API\V1\Client;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class ClientController extends Controller
{
    /**
     * Get client dashboard data
     */
    public function index(Request $request): JsonResponse
    {
        $user = Auth::user();
        
        // Get orders with pagination
        $orders = Order::with('clients')
            ->where('client_id', $user->id)
            ->latest()
            ->paginate(10);
        
        // Process table data
        $tableData = $orders->map(function ($order, $index) use ($orders) {
            return [
                'id' => $order->id,
                'order_number' => $order->order_number,
                'title' => $order->title,
                'estimate_date' => $order->estimate_date ? Carbon::parse($order->estimate_date)->format('d/m/Y') : null,
                'status' => $order->status,
            ];
        });

        // Stats
        $totalOrders = Order::where('client_id', $user->id)
                            ->count();
        $processingOrders = Order::where('client_id', $user->id)
                                ->where('status', 'in_progress')
                                ->count();
        $completedOrders = Order::where('client_id', $user->id)
                            ->where('status', 'completed')
                            ->count();

        return response()->json([
            'success' => true,
            'data' => [
                    'stats' => [
                    'total_orders' => $totalOrders,
                    'processing_orders' => $processingOrders,
                    'completed_orders' => $completedOrders,
                ],
                'orders' => $tableData,
                'pagination' => [
                    'current_page' => $orders->currentPage(),
                    'last_page' => $orders->lastPage(),
                    'per_page' => $orders->perPage(),
                    'total' => $orders->total(),
                ],
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                ],
            ]
        ]);
    }
}