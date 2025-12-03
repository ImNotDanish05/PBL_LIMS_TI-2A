<?php

namespace App\Http\Controllers\API\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;

class OrdersController extends Controller
{
    /**
     * Menampilkan semua data order.
     */
    public function index()
    {
        $orders = Order::with([
            'clients.users',
            'analysts',
            'analysesMethods',
            'samples.sample_categories',
            'samples.n_parameter_methods' => function ($query) {
                $query->with([
                    'test_parameters.unit_values',
                    'test_parameters.reference_standards',
                    'test_methods.reference_standards',
                    'equipments.brand_types',
                    'reagents.suppliers',
                    'reagents.grades'
                ]);
            }
        ])->get();

        return response()->json($orders);
    }

    public function show(string $id)
    {
        try {
            $order = Order::with([
                'clients.users',
                'analysts.users',
                'analysts.trainings',
                'analysts.certificates',
                'analysesMethods',
                'samples.sample_categories',
                'samples.n_parameter_methods.test_parameters.unit_values',
                'samples.n_parameter_methods.test_parameters.reference_standards',
                'samples.n_parameter_methods.test_methods.reference_standards',
                'samples.n_parameter_methods.equipments.brand_types',
                'samples.n_parameter_methods.reagents.suppliers',
                'samples.n_parameter_methods.reagents.grades',
            ])->findOrFail($id);

            return response()->json($order);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Data order tidak ditemukan.',
            ], 404);
        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil data order.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }
}
