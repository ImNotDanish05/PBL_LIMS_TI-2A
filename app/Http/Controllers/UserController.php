<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    public function index(): Response
    {
        $users = User::all();
        return Inertia::render('User/Index', [
            'data' => $users,
            'resource' => 'user',
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('User/Create', [
            'fields' => (new User())->getFillable(),
            'resource' => 'user',
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'role' => ['required', Rule::in(['admin', 'manager', 'supervisor', 'staff', 'analyst', 'client'])],
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8'],
        ]);

        try {
            User::create($validated);
            return redirect()->route('user.index')->with('success', 'User created successfully.');
        } catch (\Throwable $e) {
            return back()->withInput()->with('error', 'Failed to create User.');
        }
    }

    public function show(User $user): Response
    {
        return Inertia::render('User/Show', [
            'item' => $user,
            'resource' => 'user',
        ]);
    }

    public function edit(User $user): Response
    {
        return Inertia::render('User/Edit', [
            'item' => $user,
            'fields' => (new User())->getFillable(),
            'resource' => 'user',
        ]);
    }

    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'role' => ['required', Rule::in(['admin', 'manager', 'supervisor', 'staff', 'analyst', 'client'])],
            'email' => ['required', 'email', 'max:255', Rule::unique('users', 'email')->ignore($user->id)],
            'password' => ['nullable', 'string', 'min:8'],
        ]);

        try {
            $user->name = $validated['name'];
            $user->role = $validated['role'];
            $user->email = $validated['email'];
            if (!empty($validated['password'])) {
                $user->password = $validated['password'];
            }
            $user->save();
            return redirect()->route('user.index')->with('success', 'User updated successfully.');
        } catch (\Throwable $e) {
            return back()->withInput()->with('error', 'Failed to update User.');
        }
    }

    public function destroy(User $user)
    {
        try {
            $user->delete();
            return redirect()->route('user.index')->with('success', 'User deleted successfully.');
        } catch (\Throwable $e) {
            return back()->with('error', 'Failed to delete User.');
        }
    }
}
