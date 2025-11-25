<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\AnalysesMethod;

class AnalysesMethodSeeder extends Seeder
{
    /**
     * Jalankan seeder untuk tabel analyses_methods.
     */
    public function run(): void
    {
        $methods = [
            ['analyses_method' => 'Gravimetri', 'price' => 150000.0],
            ['analyses_method' => 'Spektrofotometri UV-Vis', 'price' => 200000.0],
            ['analyses_method' => 'Kromatografi Cair (HPLC)', 'price' => 350000.0],
            ['analyses_method' => 'Titrasi Asam-Basa', 'price' => 100000.0],
            ['analyses_method' => 'Spektrometri Serapan Atom (AAS)', 'price' => 300000.0],
        ];

        foreach ($methods as $method) {
            AnalysesMethod::create($method);
        }
    }
}
