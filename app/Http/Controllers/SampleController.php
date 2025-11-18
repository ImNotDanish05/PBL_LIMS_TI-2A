<?php

namespace App\Http\Controllers;

use App\Models\Sample;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class SampleController extends Controller
{
    public function index(): Response
    {
        $samples = Sample::all();
        return Inertia::render('Sample/Index', [
            'data' => $samples,
            'resource' => 'sample',
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Sample/Create', [
            'fields' => (new Sample())->getFillable(),
            'resource' => 'sample',
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'sample_category_id' => ['required', 'exists:sample_categories,id'],
            'name' => ['required', 'string', 'max:255'],
            'form' => ['required', Rule::in(['solid', 'liquid', 'gas'])],
            'preservation_method' => ['required', 'string', 'max:255'],
            'sample_volume' => ['required', 'numeric', 'min:0'],
            'condition' => ['required', Rule::in(['good', 'damages', 'expired'])],
            'status' => ['required', Rule::in(['in_progress', 'done'])],
            'storage_condition' => ['required', 'string', 'max:255'],
        ]);

        try {
            Sample::create($validated);
            return redirect()->route('sample.index')->with('success', 'Sample created successfully.');
        } catch (\Throwable $e) {
            return back()->withInput()->with('error', 'Failed to create Sample.');
        }
    }

    public function show(Sample $sample): Response
    {
        return Inertia::render('Sample/Show', [
            'item' => $sample,
            'resource' => 'sample',
        ]);
    }

    public function edit(Sample $sample): Response
    {
        return Inertia::render('Sample/Edit', [
            'item' => $sample,
            'fields' => (new Sample())->getFillable(),
            'resource' => 'sample',
        ]);
    }

    public function update(Request $request, Sample $sample)
    {
        $validated = $request->validate([
            'sample_category_id' => ['required', 'exists:sample_categories,id'],
            'name' => ['required', 'string', 'max:255'],
            'form' => ['required', Rule::in(['solid', 'liquid', 'gas'])],
            'preservation_method' => ['required', 'string', 'max:255'],
            'sample_volume' => ['required', 'numeric', 'min:0'],
            'condition' => ['required', Rule::in(['good', 'damages', 'expired'])],
            'status' => ['required', Rule::in(['in_progress', 'done'])],
            'storage_condition' => ['required', 'string', 'max:255'],
        ]);

        try {
            $sample->update($validated);
            return redirect()->route('sample.index')->with('success', 'Sample updated successfully.');
        } catch (\Throwable $e) {
            return back()->withInput()->with('error', 'Failed to update Sample.');
        }
    }

    public function destroy(Sample $sample)
    {
        try {
            $sample->delete();
            return redirect()->route('sample.index')->with('success', 'Sample deleted successfully.');
        } catch (\Throwable $e) {
            return back()->with('error', 'Failed to delete Sample.');
        }
    }
}
