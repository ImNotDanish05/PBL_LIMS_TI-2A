<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Certificate;
use Illuminate\Http\Request;

class CertificateController extends Controller
{
    public function index()
    {
        try {
            $certificates = Certificate::all();
            return response()->json($certificates, 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to fetch certificates.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function show($id)
    {
        try {
            $certificate = Certificate::find($id);

            if (!$certificate) {
                return response()->json(['message' => 'Certificate not found.'], 404);
            }

            return response()->json($certificate, 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to fetch certificate.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'analyst_id' => ['required', 'exists:analysts,id'],
            'name' => ['required', 'string', 'max:255'],
            'issued_date' => ['required', 'date'],
            'expired_date' => ['required', 'date', 'after_or_equal:issued_date'],
            'file_path' => ['required', 'string', 'max:255'],
        ]);

        try {
            $certificate = new Certificate();
            $certificate->analyst_id = $validated['analyst_id'];
            $certificate->name = $validated['name'];
            $certificate->issued_date = $validated['issued_date'];
            $certificate->expired_date = $validated['expired_date'];
            $certificate->filed_path = $validated['file_path'];
            $certificate->save();

            return response()->json($certificate, 201);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to create certificate.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $certificate = Certificate::find($id);

        if (!$certificate) {
            return response()->json(['message' => 'Certificate not found.'], 404);
        }

        $validated = $request->validate([
            'analyst_id' => ['required', 'exists:analysts,id'],
            'name' => ['required', 'string', 'max:255'],
            'issued_date' => ['required', 'date'],
            'expired_date' => ['required', 'date', 'after_or_equal:issued_date'],
            'file_path' => ['required', 'string', 'max:255'],
        ]);

        try {
            $certificate->analyst_id = $validated['analyst_id'];
            $certificate->name = $validated['name'];
            $certificate->issued_date = $validated['issued_date'];
            $certificate->expired_date = $validated['expired_date'];
            $certificate->filed_path = $validated['file_path'];
            $certificate->save();

            return response()->json($certificate, 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to update certificate.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $certificate = Certificate::find($id);

            if (!$certificate) {
                return response()->json(['message' => 'Certificate not found.'], 404);
            }

            $certificate->delete();

            return response()->json(['message' => 'Certificate deleted successfully.'], 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to delete certificate.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}

