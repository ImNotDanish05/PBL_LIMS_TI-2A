<?php

namespace App\Http\Controllers;

use App\Models\UnitValue;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class UnitValueController extends Controller
{
    public function index(): Response
    {
        $unitValues = UnitValue::all();
        return Inertia::render('UnitValue/Index', [
            'data' => $unitValues,
            'resource' => 'unit_value',
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('UnitValue/Create', [
            'fields' => (new UnitValue())->getFillable(),
            'resource' => 'unit_value',
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'value' => ['required', 'string', 'max:255'],
        ]);

        try {
            UnitValue::create($validated);
            return redirect()->route('unit_value.index')->with('success', 'Unit value created successfully.');
        } catch (\Throwable $e) {
            return back()->withInput()->with('error', 'Failed to create Unit value.');
        }
    }

    public function show(UnitValue $unitValue): Response
    {
        return Inertia::render('UnitValue/Show', [
            'item' => $unitValue,
            'resource' => 'unit_value',
        ]);
    }

    public function edit(UnitValue $unitValue): Response
    {
        return Inertia::render('UnitValue/Edit', [
            'item' => $unitValue,
            'fields' => (new UnitValue())->getFillable(),
            'resource' => 'unit_value',
        ]);
    }

    public function update(Request $request, UnitValue $unitValue)
    {
        $validated = $request->validate([
            'value' => ['required', 'string', 'max:255'],
        ]);

        try {
            $unitValue->update($validated);
            return redirect()->route('unit_value.index')->with('success', 'Unit value updated successfully.');
        } catch (\Throwable $e) {
            return back()->withInput()->with('error', 'Failed to update Unit value.');
        }
    }

    public function destroy(UnitValue $unitValue)
    {
        try {
            $unitValue->delete();
            return redirect()->route('unit_value.index')->with('success', 'Unit value deleted successfully.');
        } catch (\Throwable $e) {
            return back()->with('error', 'Failed to delete Unit value.');
        }
    }
}
