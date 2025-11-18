<?php

namespace App\Http\Controllers;

use App\Models\Reagent;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class ReagentController extends Controller
{
    public function index(): Response
    {
        $reagents = Reagent::all();
        return Inertia::render('Reagent/Index', [
            'data' => $reagents,
            'resource' => 'reagent',
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Reagent/Create', [
            'fields' => (new Reagent())->getFillable(),
            'resource' => 'reagent',
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'supplier_id' => ['required', 'exists:suppliers,id'],
            'grade_id' => ['required', 'exists:grades,id'],
            'name' => ['required', 'string', 'max:255'],
            'formula' => ['required', 'string', 'max:255'],
            'batch_number' => ['required', 'string', 'max:255'],
            'storage_location' => ['required', 'string', 'max:255'],
        ]);

        try {
            Reagent::create($validated);
            return redirect()->route('reagent.index')->with('success', 'Reagent created successfully.');
        } catch (\Throwable $e) {
            return back()->withInput()->with('error', 'Failed to create Reagent.');
        }
    }

    public function show(Reagent $reagent): Response
    {
        return Inertia::render('Reagent/Show', [
            'item' => $reagent,
            'resource' => 'reagent',
        ]);
    }

    public function edit(Reagent $reagent): Response
    {
        return Inertia::render('Reagent/Edit', [
            'item' => $reagent,
            'fields' => (new Reagent())->getFillable(),
            'resource' => 'reagent',
        ]);
    }

    public function update(Request $request, Reagent $reagent)
    {
        $validated = $request->validate([
            'supplier_id' => ['required', 'exists:suppliers,id'],
            'grade_id' => ['required', 'exists:grades,id'],
            'name' => ['required', 'string', 'max:255'],
            'formula' => ['required', 'string', 'max:255'],
            'batch_number' => ['required', 'string', 'max:255'],
            'storage_location' => ['required', 'string', 'max:255'],
        ]);

        try {
            $reagent->update($validated);
            return redirect()->route('reagent.index')->with('success', 'Reagent updated successfully.');
        } catch (\Throwable $e) {
            return back()->withInput()->with('error', 'Failed to update Reagent.');
        }
    }

    public function destroy(Reagent $reagent)
    {
        try {
            $reagent->delete();
            return redirect()->route('reagent.index')->with('success', 'Reagent deleted successfully.');
        } catch (\Throwable $e) {
            return back()->with('error', 'Failed to delete Reagent.');
        }
    }
}
