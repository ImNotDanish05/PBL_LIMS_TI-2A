<?php

namespace App\Http\Controllers\API\V1\Client;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class HistoryController extends Controller
{
    /**
     * Tampilkan order detail dengan status aktif
     */ 
    public function show($id): JsonResponse
    {
        try {
            $user = Auth::user();
            
            // Cari order milik user yang login
            $order = Order::where('id', $id)
                        ->where('client_id', $user->id)
                        ->firstOrFail();

            // Urutan status
            $steps = ['received', 'approved', 'pending', 'in_progress', 'completed', 'disapproved'];

            // Status saat ini dari database
            $currentStatus = $order->status;

            // Buat array status dengan boolean aktif
            $statuses = [];
            foreach ($steps as $step) {
                $isActive = array_search($step, $steps) <= array_search($currentStatus, $steps);
                $statuses[] = [
                    'name' => $step,
                    'is_active' => $isActive,
                    'label' => $this->getStatusLabel($step)
                ];
            }

            return response()->json([
                'success' => true,
                'data' => [
                    'order' => [
                        'id' => $order->id,
                        'order_number' => $order->order_number ?: 'M-' . $order->id,
                        'status' => $currentStatus,
                        'status_label' => $this->getStatusLabel($currentStatus),
                        'estimasi' => $order->estimate_date
                        ? ceil(Carbon::now()->floatDiffInDays(Carbon::parse($order->estimate_date))) . ' Hari'
                        : '-',
                        'created_at' => $order->created_at,
                        'updated_at' => $order->updated_at,
                    ],
                    'statuses' => $statuses
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Order tidak ditemukan'
            ], 404);
        }
    }

    // HAPUS METHOD updateStatus dari sini!
    // Karena client tidak boleh mengubah status

    /**
     * Get label untuk status
     */
    private function getStatusLabel($status)
    {
        $labels = [
            'received' => 'Sample Telah Diterima',
            'approved' => 'Order Telah Disetujui',
            'pending' => 'Order Sedang Dalam Antrean',
            'in_progress' => 'Order Sedang Dalam Proses',
            'completed' => 'Order Selesai',
            'disapproved' => 'Ditolak'
        ];

        return $labels[$status] ?? $status;
    }
}