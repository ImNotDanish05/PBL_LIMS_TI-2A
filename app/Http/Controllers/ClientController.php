<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ClientController extends Controller
{
    public function index()
    {
        return Inertia::render('client/index');
    }

    public function profile()
    {
        return Inertia::render('client/profile/index');
    }

    public function history()
    {
        return Inertia::render('client/history/index');
    }

    /**
     * Show order detail page
     */
    public function orderDetail($id)
    {
        return Inertia::render('client/detail/index', [
            'orderId' => $id
        ]);
    }

    /**
     * Show order status page
     */
    public function orderStatus($id)
    {
        return Inertia::render('client/history/index', [
            'orderId' => $id,
        ]);
    }
}