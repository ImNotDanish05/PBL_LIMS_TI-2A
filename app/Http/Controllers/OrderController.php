<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Order;
use App\Models\Sample;
use App\Models\Client;
use App\Models\AnalysesMethod;
use App\Models\NOrderSample;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    /**
     * Menampilkan halaman order staff
     */
    public function index()
    {
        $samples = Sample::all();
        $methods = AnalysesMethod::all();
        $clients = Client::all();

        return Inertia::render('staff/orders/index', [
            'samples' => $samples,
            'methods' => $methods,
            'clients' => $clients,
        ]);
    }

    /**
     * Menyimpan data order baru dari form Inertia
     */
    public function store(Request $request)
    {
        // ✅ Validasi input
        $validated = $request->validate([
            'selectedKlien.id' => 'required|exists:clients,id',
            'judulOrder' => 'required|string|max:255',
            'metodeAnalisis' => 'required|exists:analyses_methods,id',
            'tipeOrder' => 'required|string|max:50',
            'tanggalOrder' => 'required|date',
            'estimasiSelesai' => 'required|date|after_or_equal:tanggalOrder',
            'catatan' => 'nullable|string',
            'samples' => 'required|array|min:1',
            'samples.*.id' => 'exists:samples,id',
        ]);

        DB::beginTransaction();
        try {
            // ✅ Buat nomor order otomatis (misalnya ORD-YYYYMMDD-XXX)
            $today = now()->format('Ymd');
            $countToday = Order::whereDate('created_at', now())->count() + 1;
            $orderNumber = "ORD-{$today}-" . str_pad($countToday, 3, '0', STR_PAD_LEFT);

            // ✅ Simpan ke tabel orders
            $order = Order::create([
                'client_id' => $validated['selectedKlien']['id'],
                'analyses_method_id' => $validated['metodeAnalisis'],
                'order_number' => $orderNumber,
                'title' => $validated['judulOrder'],
                'order_date' => $validated['tanggalOrder'],
                'estimate_date' => $validated['estimasiSelesai'],
                'notes' => $validated['catatan'] ?? null,
                'order_type' => $validated['tipeOrder'],
                'status' => 'pending',
            ]);

            // ✅ Simpan relasi ke tabel pivot n_order_samples
            foreach ($validated['samples'] as $sample) {
                NOrderSample::create([
                    'order_id' => $order->id,
                    'sample_id' => $sample['id'],
                ]);
            }

            DB::commit();
            return back()->with('success', 'Order berhasil disimpan!');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error' => 'Gagal menyimpan order: ' . $e->getMessage()]);
        }
    }
}
