<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Order;
use App\Models\Client;
use Illuminate\Support\Str;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Pastikan sudah ada data client
        $clients = Client::all();

        if ($clients->isEmpty()) {
            $this->command->warn('⚠️ Tidak ada data client di tabel clients. Seeder Order dilewati.');
            return;
        }

        foreach ($clients as $client) {
            // Buat beberapa order untuk setiap client
            for ($i = 1; $i <= 3; $i++) {
                Order::create([
                    'client_id' => $client->id,
                    'order_number' => strtoupper(Str::random(8)),
                    'title' => "Order ke-$i untuk {$client->name}",
                    'result_value' => fake()->randomFloat(2, 10, 99) . ' mg/L',
                    'order_date' => now()->subDays(rand(1, 30)),
                    'estimate_date' => now()->addDays(rand(3, 10)),
                    'report_issued_at' => rand(0, 1) ? now()->subDays(rand(1, 5)) : null,
                    'report_file_path' => null,
                    'notes' => fake()->sentence(),
                    'order_type' => fake()->randomElement(['internal', 'regular', 'external', 'urgent']),
                    'status' => fake()->randomElement(['received', 'in_progress', 'pending', 'disapproved', 'approved', 'completed']),
                ]);
            }
        }

        $this->command->info('✅ OrderSeeder berhasil dijalankan!');
    }
}
