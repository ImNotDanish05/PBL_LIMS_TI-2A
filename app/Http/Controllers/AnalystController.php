<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;

class AnalystController extends Controller
{
    public function index() {
        return redirect()->route('analyst.dashboard');
    }

    public function inbox() {
        return Inertia::render('analyst/order');
    }

    public function history() {
        return Inertia::render('analyst/history');
    }

    public function order() {
        return Inertia::render('analyst/order');
    }

    public function orderDetail() {
        return Inertia::render('analyst/order-detail');
    }

    public function dashboard() {
        return Inertia::render('analyst/dashboard');
    }

    public function profile() {
        return Inertia::render('analyst/profile');
    }

    public function acceptOrder($id)
    {
        return redirect()->back()->with('success', 'Order berhasil diterima.');
    }

    public function downloadOrder($id)
    {
        return redirect()->back()->with('success', 'Berkas order siap diunduh.');
    }
}
