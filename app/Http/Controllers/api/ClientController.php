<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class ClientController extends Controller
{
    public function index()
    {
        try {
            $clients = Client::all();
            return response()->json($clients, 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to fetch clients.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function show($id)
    {
        try {
            $client = Client::find($id);

            if (!$client) {
                return response()->json(['message' => 'Client not found.'], 404);
            }

            return response()->json($client, 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to fetch client.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => ['required', 'exists:users,id'],
            'name' => ['required', 'string', 'max:255'],
            'address' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:clients,email'],
            'phone_number' => ['required', 'string', 'max:255'],
            'npwp_number' => ['required', 'string', 'max:255'],
        ]);

        try {
            $client = new Client();
            $client->user_id = $validated['user_id'];
            $client->name = $validated['name'];
            $client->address = $validated['address'];
            $client->email = $validated['email'];
            $client->phone_number = $validated['phone_number'];
            $client->npwp_number = $validated['npwp_number'];
            $client->save();

            return response()->json($client, 201);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to create client.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $client = Client::find($id);

        if (!$client) {
            return response()->json(['message' => 'Client not found.'], 404);
        }

        $validated = $request->validate([
            'user_id' => ['required', 'exists:users,id'],
            'name' => ['required', 'string', 'max:255'],
            'address' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', Rule::unique('clients', 'email')->ignore($client->id)],
            'phone_number' => ['required', 'string', 'max:255'],
            'npwp_number' => ['required', 'string', 'max:255'],
        ]);

        try {
            $client->user_id = $validated['user_id'];
            $client->name = $validated['name'];
            $client->address = $validated['address'];
            $client->email = $validated['email'];
            $client->phone_number = $validated['phone_number'];
            $client->npwp_number = $validated['npwp_number'];
            $client->save();

            return response()->json($client, 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to update client.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $client = Client::find($id);

            if (!$client) {
                return response()->json(['message' => 'Client not found.'], 404);
            }

            $client->delete();

            return response()->json(['message' => 'Client deleted successfully.'], 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to delete client.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}

