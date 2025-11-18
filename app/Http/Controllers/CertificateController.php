<?php

namespace App\Http\Controllers;

use App\Models\Certificate;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class CertificateController extends Controller
{
    public function index(): Response
    {
        $certificates = Certificate::all();
        return Inertia::render('Certificate/Index', [
            'data' => $certificates,
            'resource' => 'certificate',
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Certificate/Create', [
            'fields' => (new Certificate())->getFillable(),
            'resource' => 'certificate',
        ]);
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
            // Map request file_path to DB column filed_path
            $certificate->filed_path = $validated['file_path'];
            $certificate->save();

            return redirect()->route('certificate.index')->with('success', 'Certificate created successfully.');
        } catch (\Throwable $e) {
            return back()->withInput()->with('error', 'Failed to create Certificate.');
        }
    }

    public function show(Certificate $certificate): Response
    {
        return Inertia::render('Certificate/Show', [
            'item' => $certificate,
            'resource' => 'certificate',
        ]);
    }

    public function edit(Certificate $certificate): Response
    {
        return Inertia::render('Certificate/Edit', [
            'item' => $certificate,
            'fields' => (new Certificate())->getFillable(),
            'resource' => 'certificate',
        ]);
    }

    public function update(Request $request, Certificate $certificate)
    {
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

            return redirect()->route('certificate.index')->with('success', 'Certificate updated successfully.');
        } catch (\Throwable $e) {
            return back()->withInput()->with('error', 'Failed to update Certificate.');
        }
    }

    public function destroy(Certificate $certificate)
    {
        try {
            $certificate->delete();
            return redirect()->route('certificate.index')->with('success', 'Certificate deleted successfully.');
        } catch (\Throwable $e) {
            return back()->with('error', 'Failed to delete Certificate.');
        }
    }
}
