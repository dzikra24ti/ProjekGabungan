<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        // 1. Validasi input dari frontend
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // 2. Cari user berdasarkan email
        $user = User::where('email', $request->email)->first();

        // 3. Cek apakah user ada dan password-nya cocok
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Email atau password salah.'
            ], 401);
        }

        // 4. Kirim response sukses beserta data Nama & Role murni ke React
        return response()->json([
            'message' => 'Login berhasil',
            'user_name' => $user->name,
            'role' => $user->role, // Nilainya: 'owner', 'kasir', atau 'dapur'
        ], 200);
    }

    public function register(Request $request)
{
    // 1. Validasi data kiriman dari React Register.jsx
    $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:users',
        'password' => 'required|string|min:6',
    ]);

    // 2. Simpan data karyawan baru ke database
    $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => Hash::make($request->password),
        'role' => $request->role, // Menyimpan string murni 'owner', 'kasir', atau 'dapur'
    ]);

    // 3. Kembalikan response sukses ke frontend
    return response()->json([
        'message' => 'Karyawan baru berhasil didaftarkan!',
        'user' => $user
    ], 201);
}
}
