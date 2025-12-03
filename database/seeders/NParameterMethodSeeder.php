<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Sample;
use App\Models\TestParameter;
use App\Models\TestMethod;
use App\Models\NParameterMethod; // Pastikan model ini ada

class NParameterMethodSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Ambil semua data master yang diperlukan
        $samples = Sample::all();
        $parameters = TestParameter::with('unit_values')->get(); // Eager load unit
        $methods = TestMethod::all();
        $statuses = ['Failed', 'Success'];

        if ($samples->isEmpty() || $parameters->isEmpty() || $methods->isEmpty()) {
            $this->command->warn('⚠️  Data Sample, TestParameter, atau TestMethod tidak ditemukan. Lewati NParameterMethodSeeder.');
            return;
        }

        // Buat 1-3 tugas tes acak untuk SETIAP sampel
        foreach ($samples as $sample) {
            // Ambil 1-3 parameter tes acak
            $randomParams = $parameters->random(rand(1, 3));

            foreach ($randomParams as $param) {
                // Buat hasil tes palsu dengan unit yang benar
                $resultValue = number_format(rand(1, 1000) / 10, 2);
                $unit = $param->unitValue ? $param->unitValue->value : 'N/A';

                NParameterMethod::create([
                    'sample_id'         => $sample->id,
                    'test_parameter_id' => $param->id,
                    'test_method_id'    => $methods->random()->id,
                    'result'            => $resultValue . ' ' . $unit,
                    'status'            => $statuses[array_rand($statuses)],
                ]);
            }
        }
    }
}
