<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;

class AnalystController extends Controller
{
    public function index() {
        return redirect()->route('analyst.dashboard');
    }

    public function order() {
        return Inertia::render('analyst/order');
    }

    public function detail() {
        return Inertia::render('analyst/order-detail');
    }

    public function dashboard() {
        return Inertia::render('analyst/dashboard');
    }

    public function profile() {
        return Inertia::render('analyst/profile');
    }
}
