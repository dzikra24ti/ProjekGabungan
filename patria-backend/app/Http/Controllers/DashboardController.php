<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Models\User; // Pastikan model User ini di-import
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash; // Pastikan Hash ini di-import untuk cek password
use Carbon\Carbon;

class DashboardController extends Controller
{
    /**
     * Fungsi login dari database sendiri
     */
    public function login(Request $request): JsonResponse
    {
        // 1. Validasi input dari React
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // 2. Cari user berdasarkan email
        $user = User::where('email', $request->email)->first();

        // 3. Cek apakah user ada dan password-nya cocok
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Email atau password salah!'
            ], 401);
        }

        // 4. Kirim data user jika berhasil ke React
        return response()->json([
            'message' => 'Login Berhasil!',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email
            ]
        ], 200);
    }

    /**
     * Fungsi rangkuman dashboard khusus (Card 1 & Card 2)
     */
    public function getDashboardSummary(): JsonResponse
    {
        // Mengambil data finansial dasar khusus Hari Ini agar sinkron dengan database
        $omzetHariIni = Transaction::whereDate('created_at', Carbon::today())->sum('total_price') * 1000;
        $transaksiHariIni = Transaction::whereDate('created_at', Carbon::today())->count();

        return response()->json([
            'omzet_hari_ini' => $omzetHariIni,
            'transaksi_hari_ini' => $transaksiHariIni,
        ], 200);
    }
}
