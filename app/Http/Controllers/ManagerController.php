<?php

namespace App\Http\Controllers;

use App\Models\NAnalysesMethodsOrder;
use App\Models\Order;
use App\Models\ReferenceStandard;
use App\Models\SampleCategory;
use App\Models\TestMethod;
use App\Models\TestParameter;
use App\Models\UnitValue;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ManagerController extends Controller
{
    /**
     * Dashboard (/manager)
     * Shows stats + monthly revenue/order count.
     */
    public function dashboard()
    {
        $totalOrders = Order::count();
        $totalRevenue = NAnalysesMethodsOrder::sum('price');

        $stats = [
            [
                'title' => 'Total Orders',
                'value' => (string) $totalOrders,
                'subtitle' => 'Akumulasi semua order',
                'icon' => null,
            ],
            [
                'title' => 'Pendapatan',
                'value' => (string) $totalRevenue,
                'subtitle' => 'Total price dari metode analisis',
                'icon' => null,
            ],
        ];

        // 6-month window including current month
        $start = Carbon::now()->subMonths(5)->startOfMonth();
        $months = collect();
        for ($i = 0; $i < 6; $i++) {
            $current = (clone $start)->addMonths($i);
            $months->push([
                'label' => $current->format('M'),
                'start' => $current->copy()->startOfMonth(),
                'end' => $current->copy()->endOfMonth(),
            ]);
        }

        $monthlyRevenue = $months->map(function ($item) {
            $orderIds = Order::whereBetween('order_date', [$item['start'], $item['end']])->pluck('id');
            $sum = NAnalysesMethodsOrder::whereIn('order_id', $orderIds)->sum('price');
            return [
                'month' => $item['label'],
                'total' => (float) $sum,
            ];
        });

        $monthlyOrders = $months->map(function ($item) {
            $count = Order::whereBetween('order_date', [$item['start'], $item['end']])->count();
            return [
                'month' => $item['label'],
                'total' => (int) $count,
            ];
        });

        return Inertia::render('manager/index', [
            'dashboard' => [
                'stats' => $stats,
                'monthlyRevenue' => $monthlyRevenue,
                'monthlyOrders' => $monthlyOrders,
            ],
        ]);
    }

    /**
     * Report validation list (/manager/report-validation)
     */
    public function reportValidationIndex()
    {
        $orders = Order::with(['clients', 'analysts', 'samples'])
            ->where('status', 'pending')
            ->latest()
            ->get()
            ->map(function ($order, $idx) {
                $sampleName = optional($order->samples->first())->name;
                $analystNames = $order->analysts->pluck('name')->filter()->values()->all();

                return [
                    'no' => $idx + 1,
                    'id' => $order->id,
                    'sample' => $sampleName,
                    'client' => optional($order->clients)->name,
                    'analis' => !empty($analystNames) ? implode(', ', $analystNames) : null,
                    'status' => $order->status,
                ];
            });

        return Inertia::render('manager/report-validation/index', [
            'reportData' => $orders,
        ]);
    }

    /**
     * Report validation detail (/manager/report-validation/{id}) - canValidate true
     */
    public function reportValidationShow($id)
    {
        return $this->buildOrderDetail($id, true);
    }

    /**
     * Tests (read only)
     */
    public function testCategories()
    {
        return Inertia::render('manager/test/category/index', [
            'categories' => SampleCategory::all(),
        ]);
    }

    public function testParameters()
    {
        return Inertia::render('manager/test/parameter/index', [
            'parameters' => TestParameter::with(['unit_values', 'reference_standards'])->get(),
        ]);
    }

    public function testMethods()
    {
        return Inertia::render('manager/test/method/index', [
            'methods' => TestMethod::with('reference_standards')->get(),
        ]);
    }

    public function testUnits()
    {
        return Inertia::render('manager/test/unit-value/index', [
            'units' => UnitValue::all(),
        ]);
    }

    public function testReferences()
    {
        return Inertia::render('manager/test/standard-reference/index', [
            'references' => ReferenceStandard::all(),
        ]);
    }

    /**
     * Orders list/detail (read only)
     */
    public function ordersIndex()
    {
        $orders = Order::with(['clients'])
            ->latest()
            ->get()
            ->map(function ($order, $idx) {
                return [
                    'no' => $idx + 1,
                    'id' => $order->id,
                    'order_number' => $order->order_number,
                    'title' => $order->title,
                    'order_type' => $order->order_type,
                    'status' => $order->status,
                ];
            });

        return Inertia::render('manager/orders/index', [
            'ordersData' => $orders,
        ]);
    }

    public function ordersShow($id)
    {
        return $this->buildOrderDetail($id, false);
    }

    /**
     * Users list (read only)
     */
    public function usersIndex()
    {
        $users = User::orderByDesc('created_at')
            ->get()
            ->map(function ($user, $idx) {
                return [
                    'no' => $idx + 1,
                    'id' => $user->id,
                    'name' => $user->name,
                    'role' => $user->role,
                    'email' => $user->email,
                ];
            });

        return Inertia::render('manager/users/index', [
            'usersData' => $users,
        ]);
    }

    /**
     * Helper to build order detail payload for report validation & orders detail
     */
    private function buildOrderDetail($id, bool $canValidate)
    {
        $order = Order::with([
            'clients',
            'samples.sample_categories',
            'analysesMethods',
            'analysts',
            'n_parameter_methods.test_parameters.unit_values',
            'n_parameter_methods.test_parameters.reference_standards',
            'n_parameter_methods.test_methods.reference_standards',
            'n_parameter_methods.equipments',
            'n_parameter_methods.reagents',
            'n_parameter_methods.samples',
        ])->findOrFail($id);

        $parameterMethods = $order->n_parameter_methods->map(function ($npm) {
            $sample = $npm->samples;
            $parameter = $npm->test_parameters;
            $method = $npm->test_methods;

            return [
                'id' => $npm->id,
                'name' => $sample?->name,
                'category' => $sample?->sample_categories?->name,
                'status' => $npm->status,
                'parameter' => [
                    'name' => $parameter?->name,
                    'category' => $parameter?->category,
                    'detectionLimit' => $parameter?->detection_limit,
                    'qualityStandard' => $parameter?->quality_standard,
                ],
                'method' => [
                    'name' => $method?->name,
                    'reference' => $method?->reference_standards?->name,
                    'duration' => $method?->duration,
                    'validityPeriod' => $method?->validity_period,
                ],
                'equipements' => $npm->equipments->map(fn($eq) => [
                    'id' => $eq->id,
                    'name' => $eq->name,
                    'status' => $eq->status,
                    'location' => $eq->location,
                ]),
                'reagents' => $npm->reagents->map(fn($re) => [
                    'id' => $re->id,
                    'name' => $re->name,
                    'formula' => $re->formula,
                ]),
            ];
        })->values();

        $detail = [
            'id' => $order->id,
            'order_number' => $order->order_number,
            'title' => $order->title,
            'status' => $order->status,
            'order_type' => $order->order_type,
            'report_issued_at' => $order->report_issued_at,
            'report_file_path' => $order->report_file_path,
            'result_value' => $order->result_value,
            'notes' => $order->notes,
            'analysis_methods' => $order->analyses_methods->map(fn($m) => [
                'analyses_method' => $m->analyses_method,
                'pivot' => $m->pivot,
            ]),
            'client' => $order->clients,
            'parameter_methods' => $parameterMethods,
            'analysts' => $order->analysts->map(fn($a) => [
                'name' => $a->name,
                'role' => $a->specialist,
                'verified' => true,
            ]),
        ];

        return Inertia::render('manager/detail/index', [
            'detailData' => $detail,
            'canValidate' => $canValidate,
        ]);
    }
}
