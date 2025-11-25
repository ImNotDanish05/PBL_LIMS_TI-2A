<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\User;
use App\Models\Sample;
use App\Models\SampleCategory;
use App\Models\NOrderSample;
use App\Models\Order;
use App\Models\AnalysesMethod;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class StaffController extends Controller
{
    // ================================
    // KLIEN
    // ================================
    public function index()
    {
        return Inertia::render('staff/clients/index');
    }

    // ================================
    // ORDER
    // ================================
    public function indexOrder()
    {
        return Inertia::render('staff/orders/index');
    }
}
