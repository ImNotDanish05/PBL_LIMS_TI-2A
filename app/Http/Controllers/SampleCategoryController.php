<?php

namespace App\Http\Controllers;

use App\Models\SampleCategory;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class SampleCategoryController extends Controller
{
    public function index(): Response
    {
        $sampleCategories = SampleCategory::all();
        return Inertia::render('SampleCategory/Index', [
            'data' => $sampleCategories,
            'resource' => 'sample_category',
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('SampleCategory/Create', [
            'fields' => (new SampleCategory())->getFillable(),
            'resource' => 'sample_category',
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
        ]);

        try {
            SampleCategory::create($validated);
            return redirect()->route('sample_category.index')->with('success', 'Sample category created successfully.');
        } catch (\Throwable $e) {
            return back()->withInput()->with('error', 'Failed to create Sample category.');
        }
    }

    public function show(SampleCategory $sampleCategory): Response
    {
        return Inertia::render('SampleCategory/Show', [
            'item' => $sampleCategory,
            'resource' => 'sample_category',
        ]);
    }

    public function edit(SampleCategory $sampleCategory): Response
    {
        return Inertia::render('SampleCategory/Edit', [
            'item' => $sampleCategory,
            'fields' => (new SampleCategory())->getFillable(),
            'resource' => 'sample_category',
        ]);
    }

    public function update(Request $request, SampleCategory $sampleCategory)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
        ]);

        try {
            $sampleCategory->update($validated);
            return redirect()->route('sample_category.index')->with('success', 'Sample category updated successfully.');
        } catch (\Throwable $e) {
            return back()->withInput()->with('error', 'Failed to update Sample category.');
        }
    }

    public function destroy(SampleCategory $sampleCategory)
    {
        try {
            $sampleCategory->delete();
            return redirect()->route('sample_category.index')->with('success', 'Sample category deleted successfully.');
        } catch (\Throwable $e) {
            return back()->with('error', 'Failed to delete Sample category.');
        }
    }
}
