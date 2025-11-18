<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Supplier;
use Illuminate\Http\Request;

class SupplierController extends Controller
{
    public function index()
    {
        try {
            $suppliers = Supplier::all();
            return response()->json($suppliers, 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to fetch suppliers.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function show($id)
    {
        try {
            $supplier = Supplier::find($id);

            if (!$supplier) {
                return response()->json(['message' => 'Supplier not found.'], 404);
            }

            return response()->json($supplier, 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to fetch supplier.',
                'message' => $e->getMessage(),
            ], 500);
        }
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
            $supplier = Supplier::create($validated);
            return response()->json($supplier, 201);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to create supplier.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $supplier = Supplier::find($id);

        if (!$supplier) {
            return response()->json(['message' => 'Supplier not found.'], 404);
        }

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'contact_person' => ['required', 'string', 'max:255'],
            'phone_number' => ['required', 'string', 'max:255'],
            'address' => ['required', 'string', 'max:255'],
        ]);

        try {
            $supplier->update($validated);
            return response()->json($supplier, 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to update supplier.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $supplier = Supplier::find($id);

            if (!$supplier) {
                return response()->json(['message' => 'Supplier not found.'], 404);
            }

            $supplier->delete();

            return response()->json(['message' => 'Supplier deleted successfully.'], 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to delete supplier.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}

