<?php

namespace App\Http\Controllers\API\V1\Staff;

use App\Http\Controllers\Controller;
use App\Models\Client;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class ClientController extends Controller
{

    public function index()
    {
        $clients = Client::with('users')->get();

        return response()->json($clients);
    }
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'required|string',
            'phone_number' => 'required|string',
            'npwp_number' => 'required|string',
            'email' => [
                'required',
                'email',
                'unique:users,email',
                'unique:clients,email'
            ],
            'password' => 'required|string|min:8',
        ]);


        $user = User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => Hash::make($validatedData['password']),
            'role' => 'client',
        ]);

        $client = Client::create([
            'user_id' => $user->id,
            'name' => $validatedData['name'],
            'address' => $validatedData['address'],
            'phone_number' => $validatedData['phone_number'],
            'npwp_number' => $validatedData['npwp_number'],
            'email' => $validatedData['email'],
        ]);

        return response()->json([
            'message' => 'Client berhasil dibuat.',
            'data' => $client,
        ], 201);
    }

    public function update(Request $request, Client $client)
    {
        // 1. Validasi data
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'required|string',
            'phone_number' => 'required|string',
            'npwp_number' => 'required|string',
            'email' => [
                'required',
                'email',
                Rule::unique('users')->ignore($client->user_id),
                Rule::unique('clients')->ignore($client->id)
            ],
        ]);

        // 2. Update data di tabel User
        $client->users->update([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
        ]);

        // 3. Update data di tabel Client
        $client->update([
            'name' => $validatedData['name'],
            'address' => $validatedData['address'],
            'phone_number' => $validatedData['phone_number'],
            'npwp_number' => $validatedData['npwp_number'],
            'email' => $validatedData['email'],
        ]);

        return response()->json([
            'message' => 'Client berhasil diperbarui.',
            'data' => $client,
        ], 201);
    }

    public function destroy(Client $client)
    {
        if ($client->users) {
            $client->users->delete();
        }
        $client->delete();

        return response()->json([
            'message' => 'Client berhasil dihapus.',
            'data' => $client,
        ], 201);
    }

    // ================================
    // SAMPLE
    // ================================


}
