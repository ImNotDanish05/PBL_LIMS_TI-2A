<?php

namespace App\Http\Controllers;

use App\Models\Training;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class TrainingController extends Controller
{
    public function index(): Response
    {
        $trainings = Training::all();
        return Inertia::render('Training/Index', [
            'data' => $trainings,
            'resource' => 'training',
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Training/Create', [
            'fields' => (new Training())->getFillable(),
            'resource' => 'training',
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'provider' => ['required', 'string', 'max:255'],
            'date' => ['required', 'date'],
            'result' => ['required', 'string', 'max:255'],
        ]);

        try {
            Training::create($validated);
            return redirect()->route('training.index')->with('success', 'Training created successfully.');
        } catch (\Throwable $e) {
            return back()->withInput()->with('error', 'Failed to create Training.');
        }
    }

    public function show(Training $training): Response
    {
        return Inertia::render('Training/Show', [
            'item' => $training,
            'resource' => 'training',
        ]);
    }

    public function edit(Training $training): Response
    {
        return Inertia::render('Training/Edit', [
            'item' => $training,
            'fields' => (new Training())->getFillable(),
            'resource' => 'training',
        ]);
    }

    public function update(Request $request, Training $training)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'provider' => ['required', 'string', 'max:255'],
            'date' => ['required', 'date'],
            'result' => ['required', 'string', 'max:255'],
        ]);

        try {
            $training->update($validated);
            return redirect()->route('training.index')->with('success', 'Training updated successfully.');
        } catch (\Throwable $e) {
            return back()->withInput()->with('error', 'Failed to update Training.');
        }
    }

    public function destroy(Training $training)
    {
        try {
            $training->delete();
            return redirect()->route('training.index')->with('success', 'Training deleted successfully.');
        } catch (\Throwable $e) {
            return back()->with('error', 'Failed to delete Training.');
        }
    }
}
