<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ManagerController extends Controller
{
    public function index()
    {
        return Inertia::render('manager/index');
    }

    public function reportValidation()
    {
        return Inertia::render('manager/report-validation/index');
    }

    public function detailValidation()
    {
        return Inertia::render('manager/detail/index', [
            'canValidate' => true,
        ]);
    }

    public function orders()
    {
        return Inertia::render('manager/orders/index');
    }

    public function detailOrder()
    {
        return Inertia::render('manager/detail/index', [
            'canValidate' => false,
        ]);
    }

    public function users()
    {
        return Inertia::render('manager/users/index');
    }
}