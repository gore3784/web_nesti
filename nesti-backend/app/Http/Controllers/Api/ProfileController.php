<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class ProfileController extends Controller
{
    // GET: /api/profile
    public function show()
    {
        $user = Auth::user();
        return response()->json($user);
    }

    // PUT/PATCH: /api/profile
    public function update(Request $request)
    {
        $user = Auth::user();

        $validated = $request->validate([
            'full_name' => 'required|string|max:100',
            'phone' => 'nullable|string|max:20',
        ]);

        $user->full_name = $validated['full_name'];
        $user->phone = $validated['phone'] ?? null;
        $user->save();

        return response()->json([
            'message' => 'Profile updated successfully',
            'user' => $user
        ]);
    }

    // PUT: /api/profile/password
    public function updatePassword(Request $request)
    {
        $user = Auth::user();

        $request->validate([
            'currentPassword' => 'required|string',
            'newPassword' => 'required|string|min:6|confirmed', // pastikan ada field newPassword_confirmation
        ]);

        if (!Hash::check($request->currentPassword, $user->password)) {
            throw ValidationException::withMessages([
                'currentPassword' => 'Current password is incorrect.',
            ]);
        }

        $user->password = Hash::make($request->newPassword);
        $user->save();

        return response()->json([
            'message' => 'Password changed successfully',
        ]);
    }
}
