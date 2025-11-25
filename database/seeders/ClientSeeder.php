<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Client;

class ClientSeeder extends Seeder
{
    public function run(): void
    {
        $clientUsers = User::where('role', 'client')->get();

        if ($clientUsers->isEmpty()) {
            $this->command->warn('⚠️ Tidak ditemukan user dengan role "client". Jalankan UserRoleSeeder dulu!');
            return;
        }

        $addresses = [
            ['address' => 'Jl. Gatot Subroto No. 15, Jakarta', 'npwp' => '01.234.567.8-999.000'],
            ['address' => 'Jl. Pasteur No. 77, Bandung', 'npwp' => '02.345.678.9-888.000'],
            ['address' => 'Jl. Diponegoro No. 8, Surabaya', 'npwp' => '03.456.789.0-777.000'],
            ['address' => 'Jl. Sudirman No. 5, Palembang', 'npwp' => '04.567.890.1-666.000'],
            ['address' => 'Jl. Raya Denpasar No. 10, Bali', 'npwp' => '05.678.901.2-555.000'],
        ];

        foreach ($clientUsers as $index => $user) {
            Client::create([
                'user_id' => $user->id,
                'name' => $user->name,
                'address' => $addresses[$index % count($addresses)]['address'],
                'email' => $user->email,
                'phone_number' => '081' . rand(10000000, 99999999),
                'npwp_number' => $addresses[$index % count($addresses)]['npwp'],
            ]);
        }
    }
}
