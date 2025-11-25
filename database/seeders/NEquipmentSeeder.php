<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\NParameterMethod;
use App\Models\Equipment;

class NEquipmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Ambil semua tugas tes dan alat
        $tasks = NParameterMethod::all();
        $equipments = Equipment::all();

        if ($tasks->isEmpty() || $equipments->isEmpty()) {
            $this->command->warn('⚠️  Data NParameterMethod (tugas) atau Equipment tidak ditemukan. Lewati NEquipmentSeeder.');
            return;
        }

        // Tugaskan 1 alat acak ke setiap tugas
        foreach ($tasks as $task) {
            $randomEquipment = $equipments->random();

            // Gunakan Eloquent relationship untuk mengisi tabel pivot
            $task->equipments()->attach($randomEquipment->id);
        }
    }
}
