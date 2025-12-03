<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\NParameterMethod;
use App\Models\Reagent;

class NReagentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Ambil semua tugas tes dan bahan
        $tasks = NParameterMethod::all();
        $reagents = Reagent::all();

        if ($tasks->isEmpty() || $reagents->isEmpty()) {
            $this->command->warn('⚠️  Data NParameterMethod (tugas) atau Reagent tidak ditemukan. Lewati NReagentSeeder.');
            return;
        }

        // Tugaskan 1-2 bahan acak ke setiap tugas
        foreach ($tasks as $task) {
            $randomReagents = $reagents->random(rand(1, 2))->pluck('id');

            // Gunakan Eloquent relationship untuk mengisi tabel pivot
            $task->reagents()->attach($randomReagents);
        }
    }
}
