<?php

namespace App\Http\Controllers;

use App\Models\Equipment;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class EquipmentController extends Controller
{
    public function index(): Response
    {
        $equipments = Equipment::all();
        return Inertia::render('Equipment/Index', [
            'data' => $equipments,
            'resource' => 'equipment',
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Equipment/Create', [
            'fields' => (new Equipment())->getFillable(),
            'resource' => 'equipment',
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'brand_type_id' => ['required', 'exists:brand_types,id'],
            'name' => ['required', 'string', 'max:255'],
            'serial_number' => ['nullable', 'string', 'max:255'],
            'purchase_year' => ['required', 'date'],
            'calibration_schedule' => ['required', Rule::in(['internal', 'eksternal'])],
            'status' => ['required', Rule::in(['active', 'maintenance', 'broken'])],
            'location' => ['required', 'string', 'max:255'],
        ]);

        try {
            Equipment::create($validated);
            return redirect()->route('equipment.index')->with('success', 'Equipment created successfully.');
        } catch (\Throwable $e) {
            return back()->withInput()->with('error', 'Failed to create Equipment.');
        }
    }

    public function show(Equipment $equipment): Response
    {
        return Inertia::render('Equipment/Show', [
            'item' => $equipment,
            'resource' => 'equipment',
        ]);
    }

    public function edit(Equipment $equipment): Response
    {
        return Inertia::render('Equipment/Edit', [
            'item' => $equipment,
            'fields' => (new Equipment())->getFillable(),
            'resource' => 'equipment',
        ]);
    }

    public function update(Request $request, Equipment $equipment)
    {
        $validated = $request->validate([
            'brand_type_id' => ['required', 'exists:brand_types,id'],
            'name' => ['required', 'string', 'max:255'],
            'serial_number' => ['nullable', 'string', 'max:255'],
            'purchase_year' => ['required', 'date'],
            'calibration_schedule' => ['required', Rule::in(['internal', 'eksternal'])],
            'status' => ['required', Rule::in(['active', 'maintenance', 'broken'])],
            'location' => ['required', 'string', 'max:255'],
        ]);

        try {
            $equipment->update($validated);
            return redirect()->route('equipment.index')->with('success', 'Equipment updated successfully.');
        } catch (\Throwable $e) {
            return back()->withInput()->with('error', 'Failed to update Equipment.');
        }
    }

    public function destroy(Equipment $equipment)
    {
        try {
            $equipment->delete();
            return redirect()->route('equipment.index')->with('success', 'Equipment deleted successfully.');
        } catch (\Throwable $e) {
            return back()->with('error', 'Failed to delete Equipment.');
        }
    }
}
