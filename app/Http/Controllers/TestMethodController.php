<?php

namespace App\Http\Controllers;

use App\Models\TestMethod;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class TestMethodController extends Controller
{
    public function index(): Response
    {
        $testMethods = TestMethod::all();
        return Inertia::render('TestMethod/Index', [
            'data' => $testMethods,
            'resource' => 'test_method',
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('TestMethod/Create', [
            'fields' => (new TestMethod())->getFillable(),
            'resource' => 'test_method',
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'reference_id' => ['required', 'exists:reference_standards,id'],
            'name' => ['required', 'string', 'max:255'],
            'applicable_parameter' => ['required', 'string', 'max:255'],
            'duration' => ['required', 'integer', 'min:0'],
            'validity_period' => ['required', 'date'],
        ]);

        try {
            TestMethod::create($validated);
            return redirect()->route('test_method.index')->with('success', 'Test method created successfully.');
        } catch (\Throwable $e) {
            return back()->withInput()->with('error', 'Failed to create Test method.');
        }
    }

    public function show(TestMethod $testMethod): Response
    {
        return Inertia::render('TestMethod/Show', [
            'item' => $testMethod,
            'resource' => 'test_method',
        ]);
    }

    public function edit(TestMethod $testMethod): Response
    {
        return Inertia::render('TestMethod/Edit', [
            'item' => $testMethod,
            'fields' => (new TestMethod())->getFillable(),
            'resource' => 'test_method',
        ]);
    }

    public function update(Request $request, TestMethod $testMethod)
    {
        $validated = $request->validate([
            'reference_id' => ['required', 'exists:reference_standards,id'],
            'name' => ['required', 'string', 'max:255'],
            'applicable_parameter' => ['required', 'string', 'max:255'],
            'duration' => ['required', 'integer', 'min:0'],
            'validity_period' => ['required', 'date'],
        ]);

        try {
            $testMethod->update($validated);
            return redirect()->route('test_method.index')->with('success', 'Test method updated successfully.');
        } catch (\Throwable $e) {
            return back()->withInput()->with('error', 'Failed to update Test method.');
        }
    }

    public function destroy(TestMethod $testMethod)
    {
        try {
            $testMethod->delete();
            return redirect()->route('test_method.index')->with('success', 'Test method deleted successfully.');
        } catch (\Throwable $e) {
            return back()->with('error', 'Failed to delete Test method.');
        }
    }
}
