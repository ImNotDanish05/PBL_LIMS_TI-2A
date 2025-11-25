<?php

namespace App\Http\Controllers\API\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Equipment;
use App\Models\Reagent;
use App\Models\Sample;
use App\Models\TestParameter;
use App\Models\TestMethod;
use App\Models\Order;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $totalUser = User::count();
        $totalEquipment = Equipment::count();
        $totalReagent = Reagent::count();
        $totalOrder = Order::count();
        $totalParameter = TestParameter::count();
        $totalMethod = TestMethod::count();

        $totalResources = $totalEquipment + $totalReagent + $totalParameter + $totalMethod;

        $pengujianBulanIni = Order::whereMonth('created_at', now()->month)->count();
        $rataRataHarian = round(Order::whereMonth('created_at', now()->month)->count() / now()->day, 1);
        $efisiensi = rand(85, 99);

        $monthlyTrendData = $this->monthlyTrendData();
        $resourceDistribution = $this->resourceDistribution();
        $weeklyActivity = $this->weeklyActivity();

        return response()->json([
            'totalUser' => $totalUser,
            'totalEquipment' => $totalEquipment,
            'totalReagent' => $totalReagent,
            'totalOrder' => $totalOrder,
            'totalParameter' => $totalParameter,
            'totalMethod' => $totalMethod,
            'quickSummary' => [
                'totalResources' => $totalResources,
                'pengujianBulanIni' => $pengujianBulanIni,
                'rataRataHarian' => $rataRataHarian,
                'efisiensi' => $efisiensi,
            ],
            'monthlyTrendData' => $monthlyTrendData,
            'resourceDistribution' => $resourceDistribution,
            'weeklyActivity' => $weeklyActivity,
        ], 200);
    }

    private function monthlyTrendData()
    {
        return collect(range(5, 0))->map(function ($i) {
            $month = now()->subMonths($i);
            return [
                'month' => $month->format('M'),
                'clients' => User::where('role', 'client')
                    ->whereMonth('created_at', $month->month)
                    ->whereYear('created_at', $month->year)
                    ->count(),
                'sampel' => Sample::whereMonth('created_at', $month->month)
                    ->whereYear('created_at', $month->year)
                    ->count(),
                'pengujian' => Order::whereMonth('created_at', $month->month)
                    ->whereYear('created_at', $month->year)
                    ->count(),
            ];
        })->values();
    }

    private function resourceDistribution()
    {
        return [
            ['name' => 'Peralatan', 'value' => Equipment::count(), 'color' => '#10b981'],
            ['name' => 'Reagen', 'value' => Reagent::count(), 'color' => '#3b82f6'],
            ['name' => 'Parameter', 'value' => TestParameter::count(), 'color' => '#8b5cf6'],
            ['name' => 'Metode Uji', 'value' => TestMethod::count(), 'color' => '#f59e0b'],
        ];
    }

    private function weeklyActivity()
    {
        return collect(range(6, 0))->map(function ($i) {
            $day = now()->subDays($i);
            return [
                'day' => $day->format('D'),
                'tests' => Order::whereDate('created_at', $day->toDateString())->count(),
            ];
        });
    }
}
