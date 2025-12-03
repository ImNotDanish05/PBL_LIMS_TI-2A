<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\StaffController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\AnalystController;
// use App\Http\Controllers\API\V1\AuthController as V1AuthController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ManagerController;
use App\Http\Controllers\SupervisorController;
use Inertia\Inertia;

// Home
Route::controller(HomeController::class)->group(function () {
    Route::get('/', 'index')->name('index');
});

// Auth
Route::controller(AuthController::class)
    ->prefix('auth')
    ->name('auth.')
    ->group(function () {
        Route::middleware('guest')->group(function () {
            Route::get('/login', 'index')->name('login.form');
        });
        Route::middleware('auth')->group(function () {
            Route::post('/logout', 'logout')->name('logout');
            Route::get('/logout', 'logout');
        });
    });

// Admin
Route::middleware(['auth', 'role:admin'])
    ->prefix('admin')
    ->as('admin.')
    ->group(function () {
        Route::get('/', fn() => Inertia::render('admin/index'))
            ->name('index');

        Route::prefix('resources')->as('resources.')->group(function () {
            Route::inertia('/equipments', 'admin/tools/equipments/index')->name('equipments');
            Route::inertia('/brands', 'admin/tools/brands/index')->name('brands');
            Route::inertia('/reagents', 'admin/materials/reagents/index')->name('reagents');
            Route::inertia('/grades', 'admin/materials/grades/index')->name('grades');
            Route::inertia('/suppliers', 'admin/materials/suppliers/index')->name('suppliers');
        });

        Route::prefix('tests')->as('tests.')->group(function () {
            Route::inertia('/parameters', 'admin/test/parameter/index')->name('parameters');
            Route::inertia('/methods', 'admin/test/method/index')->name('methods');
            Route::inertia('/units', 'admin/test/unit-value/index')->name('units');
            Route::inertia('/references', 'admin/test/standard-reference/index')->name('references');
            Route::inertia('/categories', 'admin/test/category/index')->name('categories');
        });

        Route::prefix('analyst')->as('analyst.')->group(function () {
            Route::inertia('/trainings', 'admin/analyst/trainings/index')->name('trainings');
            Route::inertia('/certificates', 'admin/analyst/certificates/index')->name('certificates');
        });

        Route::inertia('/orders', 'admin/orders/index')->name('orders');

        Route::get('/orders/{id}', function ($id) {
            return Inertia::render('admin/detail/index', [
                'id' => $id,
                'canValidate' => false,
            ]);
        })->name('order.show');

        Route::inertia('/users', 'admin/users/index')->name('users');
        Route::inertia('/reports', 'admin/reports/index')->name('reports');
    });

// Manager
Route::middleware(['auth', 'role:manager'])
    ->prefix('manager')
    ->as('manager.')
    ->group(function () {
        Route::inertia('/', 'manager/index')->name('index');

        Route::prefix('report-validation')->as('report.validation.')->group(function () {
            Route::inertia('/', 'manager/report-validation/index')->name('index');
            Route::get('/{id}', function ($id) {
                return Inertia::render('manager/detail/index', [
                    'id' => $id,
                    'canValidate' => true,
                ]);
            })->name('show');
        });

        Route::prefix('orders')->as('orders.')->group(function () {
            Route::inertia('/', 'manager/orders/index')->name('index');
            Route::get('/{id}', function ($id) {
                return Inertia::render('manager/detail/index', [
                    'id' => $id,
                    'canValidate' => false,
                ]);
            })->name('show');
        });

        Route::inertia('/users', 'manager/users/index')->name('users');
    });


// Staff
Route::controller(StaffController::class)
    ->middleware(['auth', 'role:staff'])
    ->prefix('staff')
    ->name('staff.')
    ->group(function () {
        Route::redirect('/', '/staff/manage-clients');

        // Manage Clients
        Route::prefix('manage-clients')
            ->name('client.')
            ->group(function () {
                Route::get('/', 'index')->name('index');
            });


        // Orders
        Route::prefix('orders')
            ->name('order.')
            ->group(function () {
                Route::get('/', 'indexOrder')->name('index');
            });
    });

// Supervisor
Route::controller(SupervisorController::class)
    ->middleware(['auth', 'role:supervisor'])
    ->prefix('supervisor')
    ->name('supervisor.')
    ->group(function () {
        Route::get('/', 'index')->name('index');
    });


// Analyst
Route::controller(AnalystController::class)
    ->middleware(['auth', 'role:analyst'])
    ->prefix('analyst')
    ->name('analyst.')
    ->group(function () {
        Route::get('/', 'index')->name('index');
        Route::get('/inbox', 'inbox')->name('inbox');
        Route::get('/history', 'history')->name('history');
        Route::get('/dashboard', 'dashboard')->name('dashboard');

        // Orders
        Route::prefix('orders')
            ->name('order.')
            ->group(function () {
                Route::get('/', 'order')->name('index');
                Route::get('/{id}', 'orderDetail')->name('detail');
                Route::put('/{id}/accept', 'acceptOrder')->name('accept');
                Route::post('/{id}/download', 'downloadOrder')->name('download');
            });

        // Samples
        Route::prefix('samples')
            ->name('sample.')
            ->group(function () {
                Route::post('/{id}/confirm', 'confirmSample')->name('confirm');
                Route::post('/{id}/unconfirm', 'unconfirmSample')->name('unconfirm');
            });

        // Reports
        Route::prefix('reports')
            ->name('report.')
            ->group(function () {
                Route::post('/', 'createReport')->name('create');
                Route::put('/{id}', 'updateReport')->name('update');
            });
    });

// Client
Route::controller(ClientController::class)
    ->middleware(['auth', 'role:client'])
    ->prefix('client')
    ->name('client.')
    ->group(function () {
        Route::get('/', 'index')->name('index');
        Route::get('/profile', 'profile')->name('profile');
        Route::get('/history', 'history')->name('history');

        // Orders - sesuaikan dengan API structure
        Route::prefix('orders')
            ->name('orders.')
            ->group(function () {
                Route::get('/{id}', 'orderDetail')->name('show');
                Route::get('/status/{id}', 'orderStatus')->name('status');
            });
    });

require __DIR__ . '/auth.php';
