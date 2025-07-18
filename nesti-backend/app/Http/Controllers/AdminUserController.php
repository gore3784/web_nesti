<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class AdminUserController extends Controller
{
    public function index()
    {
        $users = User::withCount('orders')
            ->withSum('orders as total_spent', 'total_amount')
            ->get()
            ->map(function ($u) {
                return [
                    'id' => $u->id,
                    'email' => $u->email,
                    'full_name' => $u->full_name,
                    'phone' => $u->phone,
                    'created_at' => $u->created_at,
                    'orders_count' => $u->orders_count,
                    'total_spent' => $u->total_spent ?? 0,
                    'status' => $u->status ? 'active' : 'inactive',
                ];
            });

        return response()->json($users);
    }
}
