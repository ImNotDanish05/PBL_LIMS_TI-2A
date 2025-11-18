<?php

namespace App\Http\Controllers;

use App\Models\NParameterMethod;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class NParameterMethodController extends Controller
{
    public function index(): Response
    {
        $nParameterMethods = NParameterMethod::all();
        return Inertia::render('NParameterMethod/Index', [
            'data' => $nParameterMethods,
            'resource' => 'n_parameter_method',
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('NParameterMethod/Create', [
            'fields' => (new NParameterMethod())->getFillable(),
            'resource' => 'n_parameter_method',
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'sample_id' => ['required', 'exists:samples,id'],
            'test_parameter_id' => ['required', 'exists:test_parameters,id'],
            'test_method_id' => ['required', 'exists:test_methods,id'],
            'result' => ['nullable', 'string', 'max:255'],
            'status' => ['required', Rule::in(['failed', 'success'])],
        ]);

        try {
            NParameterMethod::create($validated);
            return redirect()->route('n_parameter_method.index')->with('success', 'Record created successfully.');
        } catch (\Throwable $e) {
            return back()->withInput()->with('error', 'Failed to create record.');
        }
    }

    public function show(NParameterMethod $nParameterMethod): Response
    {
        return Inertia::render('NParameterMethod/Show', [
            'item' => $nParameterMethod,
            'resource' => 'n_parameter_method',
        ]);
    }

    public function edit(NParameterMethod $nParameterMethod): Response
    {
        return Inertia::render('NParameterMethod/Edit', [
            'item' => $nParameterMethod,
            'fields' => (new NParameterMethod())->getFillable(),
            'resource' => 'n_parameter_method',
        ]);
    }

    public function update(Request $request, NParameterMethod $nParameterMethod)
    {
        $validated = $request->validate([
            'sample_id' => ['required', 'exists:samples,id'],
            'test_parameter_id' => ['required', 'exists:test_parameters,id'],
            'test_method_id' => ['required', 'exists:test_methods,id'],
            'result' => ['nullable', 'string', 'max:255'],
            'status' => ['required', Rule::in(['failed', 'success'])],
        ]);

        try {
            $nParameterMethod->update($validated);
            return redirect()->route('n_parameter_method.index')->with('success', 'Record updated successfully.');
        } catch (\Throwable $e) {
            return back()->withInput()->with('error', 'Failed to update record.');
        }
    }

    public function destroy(NParameterMethod $nParameterMethod)
    {
        try {
            $nParameterMethod->delete();
            return redirect()->route('n_parameter_method.index')->with('success', 'Record deleted successfully.');
        } catch (\Throwable $e) {
            return back()->with('error', 'Failed to delete record.');
        }
    }
}
