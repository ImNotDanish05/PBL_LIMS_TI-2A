<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Home;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index()
    {
        try {
            return response()->json([
                'metrics' => Home::metrics(),
                'latest_orders' => Home::latestOrders(),
                'messages' => Home::allMessages(),
            ], 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to fetch dashboard data.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function show($id)
    {
        try {
            if ($id === 'metrics') {
                return response()->json(Home::metrics(), 200);
            }

            if ($id === 'latest-orders') {
                return response()->json(Home::latestOrders(), 200);
            }

            $metrics = Home::metrics();
            if (array_key_exists($id, $metrics)) {
                return response()->json([$id => $metrics[$id]], 200);
            }

            if (is_numeric($id)) {
                $message = Home::findMessage((int)$id);
                if ($message) {
                    return response()->json($message, 200);
                }
            }

            return response()->json(['message' => 'Dashboard item not found.'], 404);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to fetch dashboard item.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string'],
            'highlight' => ['sometimes', 'boolean'],
        ]);

        try {
            $message = Home::createMessage($validated);
            return response()->json($message, 201);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to create dashboard message.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        if (!is_numeric($id)) {
            return response()->json(['message' => 'Dashboard message not found.'], 404);
        }

        $validated = $request->validate([
            'title' => ['sometimes', 'required', 'string', 'max:255'],
            'content' => ['sometimes', 'required', 'string'],
            'highlight' => ['sometimes', 'boolean'],
        ]);

        try {
            $message = Home::updateMessage((int)$id, $validated);

            if (!$message) {
                return response()->json(['message' => 'Dashboard message not found.'], 404);
            }

            return response()->json($message, 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to update dashboard message.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function destroy($id)
    {
        if (!is_numeric($id)) {
            return response()->json(['message' => 'Dashboard message not found.'], 404);
        }

        try {
            $deleted = Home::deleteMessage((int)$id);

            if (!$deleted) {
                return response()->json(['message' => 'Dashboard message not found.'], 404);
            }

            return response()->json(['message' => 'Dashboard message deleted successfully.'], 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to delete dashboard message.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}

