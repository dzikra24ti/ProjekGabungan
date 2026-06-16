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
        // 1. Tangkap parameter ?range= dari React (Default ke 'hari_ini' jika tidak ada)
        $range = $request->query('range', 'hari_ini');

        // 2. Siapkan query transaksi dasar
        $query = Transaction::query();

        // 3. Filter query berdasarkan periode waktu
        if ($range === 'hari_ini') {
            $query->whereDate('created_at', Carbon::today());
        } elseif ($range === 'bulan_ini') {
            $query->whereMonth('created_at', Carbon::now()->month)
                  ->whereYear('created_at', Carbon::now()->year);
        }

        // 4. Ambil semua ID transaksi yang lolos filter waktu untuk menyaring tabel detail
        $transactionIds = $query->pluck('id');

        // 5. Hitung Total Pendapatan & Jumlah Nota Terfilter
        // Catatan: Dikali 1000 jika Anda menyimpan nominal ringkas di DB (misal: 92 menjadi 92.000)
        $totalPendapatan = $query->sum('total_price') * 1000;
        $totalNota = $query->count();

        // 6. Hitung Total Porsi Terjual dari tabel detail berdasarkan nota yang terfilter
        $totalPorsi = DB::table('transaction_details')
            ->whereIn('transaction_id', $transactionIds)
            ->sum('quantity');

        // 7. Ambil semua data produk untuk menyusun Rincian Penjualan per Menu
        $products = Product::all();

        $rincianMenu = $products->map(function ($product) use ($transactionIds, $totalPendapatan) {
            // Hitung berapa porsi menu ini terjual pada periode tersebut
            $kuantitasTerjual = DB::table('transaction_details')
                ->whereIn('transaction_id', $transactionIds)
                ->where('product_id', $product->id)
                ->sum('quantity');

            // Hitung subtotal omzet per produk (Harga produk dikali 1000 jika nominal ringkas)
            $subtotalOmzet = $kuantitasTerjual * ($product->price * 1000);

            // Hitung persentase kontribusi menu terhadap omzet kotor kedai
            $kontribusi = $totalPendapatan > 0 ? round(($subtotalOmzet / $totalPendapatan) * 100) : 0;

            return [
                'id' => $product->id,
                'title' => $product->title,
                'kuantitas_terjual' => (int) $kuantitasTerjual,
                'subtotal_omzet' => $subtotalOmzet,
                'kontribusi' => $kontribusi
            ];
        });

        // 8. Cari Juara Menu Terlaris (Kuantitas terjual paling tinggi)
        $menuTerlarisData = collect($rincianMenu)->sortByDesc('kuantitas_terjual')->first();
        $menuTerlaris = ($menuTerlarisData && $menuTerlarisData['kuantitas_terjual'] > 0)
            ? $menuTerlarisData['title']
            : "Belum Ada";

        // 9. Kembalikan data matang dalam format JSON ke React
        return response()->json([
            'total_pendapatan' => $totalPendapatan,
            'total_nota' => $totalNota,
            'total_porsi' => (int) $totalPorsi,
            'menu_terlaris' => $menuTerlaris,
            'rincian_menu' => $rincianMenu
        ], 200);
    }
}
