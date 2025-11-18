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
            ['analyses_method' => 'Gravimetri'],
            ['analyses_method' => 'Spektrofotometri UV-Vis'],
            ['analyses_method' => 'Kromatografi Cair (HPLC)'],
            ['analyses_method' => 'Titrasi Asam-Basa'],
            ['analyses_method' => 'Spektrometri Serapan Atom (AAS)'],
        ];

        foreach ($methods as $method) {
            AnalysesMethod::create($method);
        }
    }
}
