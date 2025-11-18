<?php

namespace App\Http\Controllers;

use App\Models\Supplier;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class SupplierController extends Controller
{
    public function index(): Response
    {
        $suppliers = Supplier::all();
        return Inertia::render('Supplier/Index', [
            'data' => $suppliers,
            'resource' => 'supplier',
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Supplier/Create', [
            'fields' => (new Supplier())->getFillable(),
            'resource' => 'supplier',
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'contact_person' => ['required', 'string', 'max:255'],
            'phone_number' => ['required', 'string', 'max:255'],
            'address' => ['required', 'string', 'max:255'],
        ]);

        try {
            Supplier::create($validated);
            return redirect()->route('supplier.index')->with('success', 'Supplier created successfully.');
        } catch (\Throwable $e) {
            return back()->withInput()->with('error', 'Failed to create Supplier.');
        }
    }

    public function show(Supplier $supplier): Response
    {
        return Inertia::render('Supplier/Show', [
            'item' => $supplier,
            'resource' => 'supplier',
        ]);
    }

    public function edit(Supplier $supplier): Response
    {
        return Inertia::render('Supplier/Edit', [
            'item' => $supplier,
            'fields' => (new Supplier())->getFillable(),
            'resource' => 'supplier',
        ]);
    }

    public function update(Request $request, Supplier $supplier)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'contact_person' => ['required', 'string', 'max:255'],
            'phone_number' => ['required', 'string', 'max:255'],
            'address' => ['required', 'string', 'max:255'],
        ]);

        try {
            $supplier->update($validated);
            return redirect()->route('supplier.index')->with('success', 'Supplier updated successfully.');
        } catch (\Throwable $e) {
            return back()->withInput()->with('error', 'Failed to update Supplier.');
        }
    }

    public function destroy(Supplier $supplier)
    {
        try {
            $supplier->delete();
            return redirect()->route('supplier.index')->with('success', 'Supplier deleted successfully.');
        } catch (\Throwable $e) {
            return back()->with('error', 'Failed to delete Supplier.');
        }
    }
}
