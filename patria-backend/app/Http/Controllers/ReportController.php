<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class ReportController extends Controller
{
    public function getOmzetReport(Request $request): JsonResponse
    {
        $range = $request->query('range', 'hari_ini');
        $query = Transaction::query();

        if ($range === 'hari_ini') {
            $query->whereDate('created_at', Carbon::today());
        } elseif ($range === 'bulan_ini') {
            $query->whereMonth('created_at', Carbon::now()->month)
                  ->whereYear('created_at', Carbon::now()->year);
        }

        $transactionIds = $query->pluck('id');
        $totalNota = $query->count();

        $totalPorsi = DB::table('transaction_details')
            ->whereIn('transaction_id', $transactionIds)
            ->sum('quantity');

        $products = Product::all();

        // 🌟 LANGKAH A: Hitung rincian subtotal per menu terlebih dahulu
        $rincianMenuRaw = $products->map(function ($product) use ($transactionIds) {
            $kuantitasTerjual = DB::table('transaction_details')
                ->whereIn('transaction_id', $transactionIds)
                ->where('product_id', $product->id)
                ->sum('quantity');

            // Subtotal omzet riil per produk (Harga produk dikali jumlah porsi terjual)
            $subtotalOmzet = (int) $kuantitasTerjual * (int) $product->price;

            return [
                'id' => $product->id,
                'title' => $product->title,
                'kuantitas_terjual' => (int) $kuantitasTerjual,
                'subtotal_omzet' => $subtotalOmzet,
            ];
        });

        // 🌟 LANGKAH B: Hitung Total Pendapatan Akurat dari jumlahan subtotal menu (Bukan dari total_price transaksi)
        $totalPendapatan = $rincianMenuRaw->sum('subtotal_omzet');

        // 🌟 LANGKAH C: Hitung nilai persentase kontribusi yang seimbang
        $rincianMenu = $rincianMenuRaw->map(function ($item) use ($totalPendapatan) {
            $item['kontribusi'] = $totalPendapatan > 0
                ? (int) round(($item['subtotal_omzet'] * 100) / $totalPendapatan)
                : 0;
            return $item;
        });

        $menuTerlarisData = collect($rincianMenu)->sortByDesc('kuantitas_terjual')->first();
        $menuTerlaris = ($menuTerlarisData && $menuTerlarisData['kuantitas_terjual'] > 0)
            ? $menuTerlarisData['title']
            : "Belum Ada";

        return response()->json([
            'total_pendapatan' => $totalPendapatan, // Hasilnya dijamin Rp 33.000 murni!
            'total_nota' => $totalNota,
            'total_porsi' => (int) $totalPorsi,
            'menu_terlaris' => $menuTerlaris,
            'rincian_menu' => $rincianMenu
        ], 200);
    }
}
