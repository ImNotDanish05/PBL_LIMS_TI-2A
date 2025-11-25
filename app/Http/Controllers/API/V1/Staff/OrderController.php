<?php

namespace App\Http\Controllers\API\V1\Staff;

use App\Http\Controllers\Controller;
use App\Models\AnalysesMethod;
use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\NAnalysesMethodsOrder;
use App\Models\NOrderSample;
use App\Models\Order;
use App\Models\Sample;
use App\Models\SampleCategory;

class OrderController extends Controller
{

    public function index()
    {
        $samples = Sample::with('sample_categories')->get();
        $methods = AnalysesMethod::all();
        $clients = Client::all();
        $categories = SampleCategory::all();
        // 🔹 Buat nomor order otomatis
        $lastOrder = Order::latest('id')->first();
        $nextNumber = str_pad(($lastOrder ? $lastOrder->id + 1 : 1), 4, '0', STR_PAD_LEFT);
        $orderNumber = 'ORD-' . now('Asia/Jakarta')->format('Ymd') . '-' . $nextNumber;

        return response()->json([
            'samples' => $samples,
            'methods' => $methods,
            'clients' => $clients,
            'categories' => $categories,
            'orderNumber' => $orderNumber,
        ]);
    }
    public function store(Request $request)
    {
        $data = $request->validate([
            'selectedKlien.id' => ['required', 'exists:clients,id'],
            'nomorOrder' => ['required', 'string'],
            'judulOrder' => ['required', 'string'],
            'metodeAnalisis' => ['array'],
            'metodeAnalisis.*.id' => ['nullable', 'integer'],
            'metodeAnalisis.*.price' => ['nullable', 'integer'],
            'metodeAnalisis.*.description' => ['nullable', 'string'],
            'tipeOrder' => ['required', 'string', 'in:internal,regular,external,urgent'],
            'tanggalOrder' => ['nullable', 'date'],
            'estimasiSelesai' => ['nullable', 'date'],
            'catatan' => ['nullable', 'string'],
            'totalHarga' => ['required', 'integer'],
            'samples' => ['array'],
            'samples.*.id' => ['nullable', 'integer'],
            'samples.*.name' => ['nullable', 'string'],
            'samples.*.form' => ['nullable', 'string'],
            'samples.*.condition' => ['nullable', 'string'],
            'samples.*.sample_category_id' => ['nullable', 'integer'],
            'samples.*.sample_volume' => ['nullable', 'string'],
        ]);

        DB::transaction(function () use ($data) {
            // 🔹 Simpan order utama
            $order = Order::create([
                'client_id' => $data['selectedKlien']['id'],
                'order_number' => $data['nomorOrder'],
                'title' => $data['judulOrder'],
                'result_value' => '-',
                'order_date' => now('Asia/Jakarta')->toDateString(),
                'estimate_date' => $data['estimasiSelesai'] ?? null,
                'report_issued_at' => null,
                'report_file_path' => '-',
                'notes' => $data['catatan'] ?? '-',
                'order_type' => $data['tipeOrder'],
                'status' => 'received',
            ]);

            // 🔹 Simpan sample order
            foreach ($data['samples'] as $sampleData) {
                NOrderSample::create([
                    'order_id' => $order->id,
                    'sample_id' => $sampleData['id'],
                    'sample_volume' => $sampleData['sample_volume'] ?? null,
                ]);
            }

            // simpan analyses method order
            foreach ($data['metodeAnalisis'] as $methodData) {
                NAnalysesMethodsOrder::create([
                    'order_id' => $order->id,
                    'analyses_method_id' => $methodData['id'],
                    'price' => $data['totalHarga'],
                    'description' => $methodData['description'] ?? '-',
                ]);
            }
        });

        return response()->json([
            'message' => 'Order berhasil dibuat.',
            'data' => $data,
        ], 201);
    }
    public function storeSample(Request $request)
    {
        $validatedData = $request->validate([
            'sample_category_id' => ['required', 'exists:sample_categories,id'],
            'name' => ['required', 'string', 'max:255'],
            'form' => ['required', 'string'],
            'preservation_method' => ['required', 'string'],
            'condition' => ['required', 'string'],
            'storage_condition' => ['required', 'string'],
        ]);

        $newSample = Sample::create([
            'sample_category_id' => $validatedData['sample_category_id'],
            'name' => $validatedData['name'],
            'form' => $validatedData['form'],
            'preservation_method' => $validatedData['preservation_method'],
            'condition' => $validatedData['condition'],
            'storage_condition' =>  $validatedData['storage_condition'],
        ]);

        if ($request->expectsJson()) {
            return response()->json([
                'message' => 'Sample berhasil dibuat.',
                'data' => $newSample
            ], 201);
        }

        return back();
    }
}
