<?php

namespace App\Http\Controllers;

use App\Models\Grade;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class GradeController extends Controller
{
    public function index(): Response
    {
        $grades = Grade::all();
        return Inertia::render('Grade/Index', [
            'data' => $grades,
            'resource' => 'grade',
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Grade/Create', [
            'fields' => (new Grade())->getFillable(),
            'resource' => 'grade',
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
        ]);

        try {
            Grade::create($validated);
            return redirect()->route('grade.index')->with('success', 'Grade created successfully.');
        } catch (\Throwable $e) {
            return back()->withInput()->with('error', 'Failed to create Grade.');
        }
    }

    public function show(Grade $grade): Response
    {
        return Inertia::render('Grade/Show', [
            'item' => $grade,
            'resource' => 'grade',
        ]);
    }

    public function edit(Grade $grade): Response
    {
        return Inertia::render('Grade/Edit', [
            'item' => $grade,
            'fields' => (new Grade())->getFillable(),
            'resource' => 'grade',
        ]);
    }

    public function update(Request $request, Grade $grade)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
        ]);

        try {
            $grade->update($validated);
            return redirect()->route('grade.index')->with('success', 'Grade updated successfully.');
        } catch (\Throwable $e) {
            return back()->withInput()->with('error', 'Failed to update Grade.');
        }
    }

    public function destroy(Grade $grade)
    {
        try {
            $grade->delete();
            return redirect()->route('grade.index')->with('success', 'Grade deleted successfully.');
        } catch (\Throwable $e) {
            return back()->with('error', 'Failed to delete Grade.');
        }
    }
}
