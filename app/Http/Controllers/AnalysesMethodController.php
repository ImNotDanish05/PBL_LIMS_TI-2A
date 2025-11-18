<?php

namespace App\Http\Controllers;

use App\Models\AnalysesMethod;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class AnalysesMethodController extends Controller
{
    public function index(): Response
    {
        $analysesMethods = AnalysesMethod::all();
        return Inertia::render('AnalysesMethod/Index', [
            'data' => $analysesMethods,
            'resource' => 'analyses_method',
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('AnalysesMethod/Create', [
            'fields' => (new AnalysesMethod())->getFillable(),
            'resource' => 'analyses_method',
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'analyses_method' => ['required', 'string', 'max:255'],
            'price' => ['required', 'numeric', 'min:0'],
        ]);

        try {
            AnalysesMethod::create($validated);
            return redirect()->route('analyses_method.index')->with('success', 'Analyses Method created successfully.');
        } catch (\Throwable $e) {
            return back()->withInput()->with('error', 'Failed to create Analyses Method.');
        }
    }

    public function show(AnalysesMethod $analysesMethod): Response
    {
        return Inertia::render('AnalysesMethod/Show', [
            'item' => $analysesMethod,
            'resource' => 'analyses_method',
        ]);
    }

    public function edit(AnalysesMethod $analysesMethod): Response
    {
        return Inertia::render('AnalysesMethod/Edit', [
            'item' => $analysesMethod,
            'fields' => (new AnalysesMethod())->getFillable(),
            'resource' => 'analyses_method',
        ]);
    }

    public function update(Request $request, AnalysesMethod $analysesMethod)
    {
        $validated = $request->validate([
            'analyses_method' => ['required', 'string', 'max:255'],
            'price' => ['required', 'numeric', 'min:0'],
        ]);

        try {
            $analysesMethod->update($validated);
            return redirect()->route('analyses_method.index')->with('success', 'Analyses Method updated successfully.');
        } catch (\Throwable $e) {
            return back()->withInput()->with('error', 'Failed to update Analyses Method.');
        }
    }

    public function destroy(AnalysesMethod $analysesMethod)
    {
        try {
            $analysesMethod->delete();
            return redirect()->route('analyses_method.index')->with('success', 'Analyses Method deleted successfully.');
        } catch (\Throwable $e) {
            return back()->with('error', 'Failed to delete Analyses Method.');
        }
    }
}
