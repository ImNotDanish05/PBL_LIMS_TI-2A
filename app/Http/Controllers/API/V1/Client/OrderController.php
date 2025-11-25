<?php

namespace App\Http\Controllers\API\V1\Client;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Sample;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class OrderController extends Controller
{
    /**
     * Get client orders
     */
    public function show($id): JsonResponse
    {
        $user = Auth::user();
        
        $order = Order::with([
                'samples.sample_categories', 
                'clients',
                'analysesMethods' // Gunakan relationship many-to-many
            ])
            ->where('client_id', $user->id)
            ->where('id', $id)
            ->first();

        if (!$order) {
            return response()->json([
                'success' => false, 
                'message' => 'Order tidak ditemukan'
            ], 404);
        }

        // Ambil nama metode analisis dari field 'analyses_method'
        $metodeAnalisis = $order->analysesMethods->isNotEmpty() 
            ? $order->analysesMethods->pluck('analyses_method')->join(', ') 
            : 'Tidak ada metode';

        $orderData = [
            'id' => $order->id, 
            'id_pemesanan' => $order->order_number ?? 'M-' . $order->id,
            'id_client' => $order->client_id,
            'judul' => $order->title ?? '-',
            'metode_analisis' => $metodeAnalisis, 
            'nilai_hasil' => $order->result_value ?? '98',
            'tanggal_order' => $order->order_date ? Carbon::parse($order->order_date)->format('d/m/Y') : null,
            'tanggal_estimasi' => $order->estimate_date ? Carbon::parse($order->estimate_date)->format('d/m/Y') : '23/10/2000',
            'waktu_laporan' => $order->report_issued_at ? Carbon::parse($order->report_issued_at)->format('d/m/Y H:i:s') : null,
            'direktori_file' => $order->report_file_path ?? 'C:/ /',
            'catatan' => $order->notes ?? '-',
            'tipe_pemesanan' => $order->order_type ?? 'Internal'
        ];

        $tableDataSamples = $order->samples->map(function ($sample) {
            return [
                'id' => $sample->id,
                'name' => $sample->name,
                'cathegory' => $sample->sample_categories->name ?? '-',
                'status' => $sample->status,
                'tanggal_masuk' => $sample->created_at ? Carbon::parse($sample->created_at)->format('d/m/Y') : null,
                'kategori_sampel' => $sample->sample_categories->name ?? '-',
                'form' => $sample->form,
                'preservation_method' => $sample->preservation_method,
                'volume' => $sample->pivot->sample_volume ?? '-',
                'condition' => $sample->condition,
                'status' => $sample->status,
            ];
        });

        $detailSample = $order->samples->map(function ($sample)  {
            return [
                'kategori_sampel' => $sample->sample_categories->name ?? '-',
                'form' => $sample->form,
                'preservation_method' => $sample->preservation_method,
                'volume' => $sample->pivot->sample_volume ?? '-',
                'condition' => $sample->condition,
                'status' => $sample->status,
            ];
        }); 

        return response()->json([
            'success' => true,
            'data' => [
                'order_details' => $orderData,
                'table_data_sample' => $tableDataSamples,
            ]
        ]);
    }
}