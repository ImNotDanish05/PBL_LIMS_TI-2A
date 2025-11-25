<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class SupervisorController extends Controller
{
    public function index()
    {
        return Inertia::render('supervisor/index');
    }
}
