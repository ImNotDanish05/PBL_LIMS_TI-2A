<?php

namespace App\Http\Controllers;

use App\Models\Analyst;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class AnalystController extends Controller
{
    public function index(): Response
    {
        $analysts = Analyst::all();
        return Inertia::render('Analyst/Index', [
            'data' => $analysts,
            'resource' => 'analyst',
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Analyst/Create', [
            'fields' => (new Analyst())->getFillable(),
            'resource' => 'analyst',
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => ['required', 'exists:users,id'],
            'name' => ['required', 'string', 'max:255'],
            'specialist' => ['required', 'string', 'max:255'],
        ]);

        try {
            Analyst::create($validated);
            return redirect()->route('analyst.index')->with('success', 'Analyst created successfully.');
        } catch (\Throwable $e) {
            return back()->withInput()->with('error', 'Failed to create Analyst.');
        }
    }

    public function show(Analyst $analyst): Response
    {
        return Inertia::render('Analyst/Show', [
            'item' => $analyst,
            'resource' => 'analyst',
        ]);
    }

    public function edit(Analyst $analyst): Response
    {
        return Inertia::render('Analyst/Edit', [
            'item' => $analyst,
            'fields' => (new Analyst())->getFillable(),
            'resource' => 'analyst',
        ]);
    }

    public function update(Request $request, Analyst $analyst)
    {
        $validated = $request->validate([
            'user_id' => ['required', 'exists:users,id'],
            'name' => ['required', 'string', 'max:255'],
            'specialist' => ['required', 'string', 'max:255'],
        ]);

        try {
            $analyst->update($validated);
            return redirect()->route('analyst.index')->with('success', 'Analyst updated successfully.');
        } catch (\Throwable $e) {
            return back()->withInput()->with('error', 'Failed to update Analyst.');
        }
    }

    public function destroy(Analyst $analyst)
    {
        try {
            $analyst->delete();
            return redirect()->route('analyst.index')->with('success', 'Analyst deleted successfully.');
        } catch (\Throwable $e) {
            return back()->with('error', 'Failed to delete Analyst.');
        }
    }
}
