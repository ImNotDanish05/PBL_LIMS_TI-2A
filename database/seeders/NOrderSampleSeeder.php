<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Order;
use App\Models\Sample;
use App\Models\NOrderSample;

class NOrderSampleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $orders = Order::all();
        $samples = Sample::all();

        // Pastikan ada data order dan sample
        if ($orders->count() === 0 || $samples->count() === 0) {
            $this->command->warn('⚠️ Tidak ada data di tabel orders atau samples. Jalankan seeder untuk kedua tabel tersebut dulu.');
            return;
        }

        // Loop setiap order dan assign beberapa sample
        foreach ($orders as $order) {
            // Ambil 1–3 sample acak untuk setiap order
            $selectedSamples = $samples->random(rand(1, 3));

            foreach ($selectedSamples as $sample) {
                NOrderSample::create([
                    'order_id' => $order->id,
                    'sample_id' => $sample->id,
                    'sample_volume' => fake()->randomFloat(2, 0.5, 5) . ' ml',
                ]);
            }
        }

        $this->command->info('✅ NOrderSampleSeeder berhasil dijalankan!');
    }
}
