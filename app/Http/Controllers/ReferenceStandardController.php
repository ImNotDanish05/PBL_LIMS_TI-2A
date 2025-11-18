<?php

namespace App\Http\Controllers;

use App\Models\ReferenceStandard;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class ReferenceStandardController extends Controller
{
    public function index(): Response
    {
        $referenceStandards = ReferenceStandard::all();
        return Inertia::render('ReferenceStandard/Index', [
            'data' => $referenceStandards,
            'resource' => 'reference_standard',
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('ReferenceStandard/Create', [
            'fields' => (new ReferenceStandard())->getFillable(),
            'resource' => 'reference_standard',
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
        ]);

        try {
            ReferenceStandard::create($validated);
            return redirect()->route('reference_standard.index')->with('success', 'Reference standard created successfully.');
        } catch (\Throwable $e) {
            return back()->withInput()->with('error', 'Failed to create Reference standard.');
        }
    }

    public function show(ReferenceStandard $referenceStandard): Response
    {
        return Inertia::render('ReferenceStandard/Show', [
            'item' => $referenceStandard,
            'resource' => 'reference_standard',
        ]);
    }

    public function edit(ReferenceStandard $referenceStandard): Response
    {
        return Inertia::render('ReferenceStandard/Edit', [
            'item' => $referenceStandard,
            'fields' => (new ReferenceStandard())->getFillable(),
            'resource' => 'reference_standard',
        ]);
    }

    public function update(Request $request, ReferenceStandard $referenceStandard)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
        ]);

        try {
            $referenceStandard->update($validated);
            return redirect()->route('reference_standard.index')->with('success', 'Reference standard updated successfully.');
        } catch (\Throwable $e) {
            return back()->withInput()->with('error', 'Failed to update Reference standard.');
        }
    }

    public function destroy(ReferenceStandard $referenceStandard)
    {
        try {
            $referenceStandard->delete();
            return redirect()->route('reference_standard.index')->with('success', 'Reference standard deleted successfully.');
        } catch (\Throwable $e) {
            return back()->with('error', 'Failed to delete Reference standard.');
        }
    }
}
