<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Equipment;
use App\Models\Reagent;
use App\Models\Sample;
use App\Models\TestParameter;
use App\Models\TestMethod;
use App\Models\Order;

class AdminController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/index');
    }

    public function equipments()
    {
        return Inertia::render('admin/tools/equipments/index');
    }

    public function brands()
    {
        return Inertia::render('admin/tools/brands/index');
    }

    public function reagents()
    {
        return Inertia::render('admin/materials/reagents/index');
    }

    public function grades()
    {
        return Inertia::render('admin/materials/grades/index');
    }

    public function suppliers()
    {
        return Inertia::render('admin/materials/suppliers/index');
    }

    public function parameters()
    {
        return Inertia::render('admin/test/parameter/index');
    }

    public function methods()
    {
        return Inertia::render('admin/test/method/index');
    }

    public function units()
    {
        return Inertia::render('admin/test/unit-value/index');
    }

    public function references()
    {
        return Inertia::render('admin/test/standard-reference/index');
    }

    public function categories()
    {
        return Inertia::render('admin/test/category/index');
    }

    public function sertificates()
    {
        return Inertia::render('admin/analyst/sertificate/index');
    }
    
    public function trainings()
    {
        return Inertia::render('admin/analyst/training/index');
    }

    public function orders()
    {
        return Inertia::render('admin/orders/index');
    }

    public function showOrder($id)
    {
        return inertia('admin/detail/index', [
            'canValidate' => false,
            'id' => $id
        ]);
    }

    public function users()
    {
        return Inertia::render('admin/users/index');
    }
}
