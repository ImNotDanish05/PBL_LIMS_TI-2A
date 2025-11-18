<?php

namespace App\Http\Controllers;

use App\Models\BrandType;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class BrandTypeController extends Controller
{
    public function index(): Response
    {
        $brandTypes = BrandType::all();
        return Inertia::render('BrandType/Index', [
            'data' => $brandTypes,
            'resource' => 'brand_type',
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('BrandType/Create', [
            'fields' => (new BrandType())->getFillable(),
            'resource' => 'brand_type',
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
        ]);

        try {
            BrandType::create($validated);
            return redirect()->route('brand_type.index')->with('success', 'Brand type created successfully.');
        } catch (\Throwable $e) {
            return back()->withInput()->with('error', 'Failed to create Brand type.');
        }
    }

    public function show(BrandType $brandType): Response
    {
        return Inertia::render('BrandType/Show', [
            'item' => $brandType,
            'resource' => 'brand_type',
        ]);
    }

    public function edit(BrandType $brandType): Response
    {
        return Inertia::render('BrandType/Edit', [
            'item' => $brandType,
            'fields' => (new BrandType())->getFillable(),
            'resource' => 'brand_type',
        ]);
    }

    public function update(Request $request, BrandType $brandType)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
        ]);

        try {
            $brandType->update($validated);
            return redirect()->route('brand_type.index')->with('success', 'Brand type updated successfully.');
        } catch (\Throwable $e) {
            return back()->withInput()->with('error', 'Failed to update Brand type.');
        }
    }

    public function destroy(BrandType $brandType)
    {
        try {
            $brandType->delete();
            return redirect()->route('brand_type.index')->with('success', 'Brand type deleted successfully.');
        } catch (\Throwable $e) {
            return back()->with('error', 'Failed to delete Brand type.');
        }
    }
}
