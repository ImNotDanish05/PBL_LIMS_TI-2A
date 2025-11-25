<?php

namespace App\Http\Controllers\API\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Analyst;
use App\Models\NTrainingAnalyst;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Exception;

class UserController extends Controller
{
    /**
     * Menampilkan semua user beserta data analis (jika ada).
     */
    public function index()
    {
        try {
            $users = User::with(['analyst.certificates', 'analyst.trainings'])->get();

            return response()->json($users);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil data pengguna.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Menambahkan user baru.
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name'       => 'required|string|max:255',
                'email'      => 'required|email|unique:users,email',
                'role'       => [
                    'required',
                    Rule::in(['admin', 'manager', 'supervisor', 'staff', 'analyst', 'client']),
                ],
                'specialist' => 'nullable|string|max:255',

                'trainings'        => 'nullable|array',
                'trainings.*.id'   => 'required|integer',
            ]);

            $trainings = collect($request->trainings ?? [])
                ->pluck('id')
                ->map(fn($id) => (int)$id)
                ->toArray();

            unset($validated['trainings']);

            $validated['password'] = Hash::make('password123');

            $user = User::create($validated);

            if ($user->role === 'analyst') {

                $analyst = Analyst::create([
                    'user_id'    => $user->id,
                    'name'       => $user->name,
                    'specialist' => $request->input('specialist', 'Umum'),
                ]);

                foreach ($trainings as $trainingId) {
                    NTrainingAnalyst::create([
                        'analyst_id'  => $analyst->id,
                        'training_id' => $trainingId,
                    ]);
                }
            }

            return response()->json([
                'success' => true,
                'message' => 'User berhasil dibuat.',
                'data'    => $user->load('analyst.trainings'),
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal membuat user.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $user = User::findOrFail($id);

            $validated = $request->validate([
                'name'       => 'sometimes|string|max:255',
                'email'      => 'sometimes|email|unique:users,email,' . $user->id,
                'role'       => [
                    'sometimes',
                    Rule::in(['admin', 'manager', 'supervisor', 'staff', 'analyst', 'client']),
                ],
                'password'   => 'sometimes|min:6',
            ]);

            $oldRole = $user->role;

            $trainings = null;
            if ($request->has('trainings')) {
                $trainings = collect($request->trainings)
                    ->pluck('id')
                    ->map(fn($id) => (int) $id)
                    ->toArray();
            }

            unset($validated['trainings']);

            if ($request->filled('password')) {
                $validated['password'] = Hash::make($request->password);
            } else {
                unset($validated['password']);
            }

            $user->update($validated);

            $newRole = $validated['role'] ?? $user->role;

            if ($oldRole === 'analyst' && $newRole !== 'analyst') {

                $analyst = Analyst::where('user_id', $user->id)->first();

                if ($analyst) {
                    NTrainingAnalyst::where('analyst_id', $analyst->id)->delete();
                    $analyst->delete();
                }
            }

            if ($newRole === 'analyst') {

                $analyst = Analyst::firstOrCreate(
                    ['user_id' => $user->id],
                    ['name' => $user->name]
                );

                $analyst->update([
                    'name'       => $validated['name'] ?? $analyst->name,
                    'specialist' => $request->input('specialist', $analyst->specialist),
                ]);

                if (!is_null($trainings)) {

                    $incomingIds = collect($trainings);

                    NTrainingAnalyst::where('analyst_id', $analyst->id)
                        ->whereNotIn('training_id', $incomingIds)
                        ->delete();

                    foreach ($incomingIds as $trainingId) {
                        NTrainingAnalyst::firstOrCreate([
                            'analyst_id'  => $analyst->id,
                            'training_id' => $trainingId,
                        ]);
                    }
                }
            }

            return response()->json([
                'success' => true,
                'message' => 'User berhasil diperbarui.',
                'data'    => $user->load('analyst.trainings'),
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal memperbarui user.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Menghapus user.
     */
    public function destroy(string $id)
    {
        try {
            $user = User::findOrFail($id);
            $user->delete();
            return response()->json([ 'success' => true, 'message' => 'User berhasil dihapus beserta data analyst.', ], 200);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal menghapus user.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }
}
