<?php

namespace App\Http\Controllers\API\V1\Staff;

use App\Http\Controllers\Controller;
use App\Models\Sample;
use Illuminate\Http\Request;

class SampleController extends Controller
{
    public function index()
    {
        $samples = Sample::with('sample_categories')->get();

        return response()->json($samples);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'sample_category_id' => ['required', 'exists:sample_categories,id'],
            'name' => ['required', 'string', 'max:255'],
            'form' => ['required', 'string'],
            'preservation_method' => ['required', 'string'],
            'condition' => ['required', 'string'],
            'storage_condition' => ['required', 'string'],
        ]);

        $newSample = Sample::create([
            'sample_category_id' => $validatedData['sample_category_id'],
            'name' => $validatedData['name'],
            'form' => $validatedData['form'],
            'preservation_method' => $validatedData['preservation_method'],
            'condition' => $validatedData['condition'],
            'storage_condition' =>  $validatedData['storage_condition'],
        ]);

        return response()->json([
            'message' => 'Sample berhasil dibuat.',
            'data' => $newSample
        ], 201);
    }
}
