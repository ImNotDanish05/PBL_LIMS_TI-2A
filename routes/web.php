<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\HomeController;
use App\Http\Controllers\AnalysesMethodController;
use App\Http\Controllers\AnalystController;
use App\Http\Controllers\BrandTypeController;
use App\Http\Controllers\CertificateController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\EquipmentController;
use App\Http\Controllers\GradeController;
use App\Http\Controllers\NAnalysesMethodsOrderController;
use App\Http\Controllers\NOrderSampleController;
use App\Http\Controllers\NParameterMethodController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ReagentController;
use App\Http\Controllers\ReferenceStandardController;
use App\Http\Controllers\SampleCategoryController;
use App\Http\Controllers\SampleController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\TestMethodController;
use App\Http\Controllers\TestParameterController;
use App\Http\Controllers\TrainingController;
use App\Http\Controllers\UnitValueController;
use App\Http\Controllers\UserController;

// Home
Route::get('/', [HomeController::class, 'index'])->name('home');

// Resource routes for Inertia CRUD
Route::resource('analyses_method', AnalysesMethodController::class);
Route::resource('analyst', AnalystController::class);
Route::resource('brand_type', BrandTypeController::class);
Route::resource('certificate', CertificateController::class);
Route::resource('client', ClientController::class);
Route::resource('equipment', EquipmentController::class);
Route::resource('grade', GradeController::class);
Route::resource('n_analyses_methods_order', NAnalysesMethodsOrderController::class);
Route::resource('n_order_sample', NOrderSampleController::class);
Route::resource('n_parameter_method', NParameterMethodController::class);
Route::resource('order', OrderController::class);
Route::resource('reagent', ReagentController::class);
Route::resource('reference_standard', ReferenceStandardController::class);
Route::resource('sample', SampleController::class);
Route::resource('sample_category', SampleCategoryController::class);
Route::resource('supplier', SupplierController::class);
Route::resource('test_method', TestMethodController::class);
Route::resource('test_parameter', TestParameterController::class);
Route::resource('training', TrainingController::class);
Route::resource('unit_value', UnitValueController::class);
Route::resource('user', UserController::class);

require __DIR__ . '/auth.php';
