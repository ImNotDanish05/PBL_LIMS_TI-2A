<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Order;
use App\Models\Analyst;

class NAnalystSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Ambil semua order dan analis yang ada
        $orders = Order::all();
        $analysts = Analyst::all();

        if ($orders->isEmpty() || $analysts->isEmpty()) {
            $this->command->warn('⚠️  Data Order or Analyst tidak ditemukan. Lewati NAnalystSeeder.');
            return;
        }

        // Tugaskan 1 atau 2 analis acak ke setiap order
        foreach ($orders as $order) {
            // Ambil 1 atau 2 ID analis secara acak
            $randomAnalysts = $analysts->random(rand(1, 2))->pluck('id');

            // Gunakan Eloquent relationship untuk mengisi tabel pivot
            $order->analysts()->attach($randomAnalysts);
        }
    }
}
