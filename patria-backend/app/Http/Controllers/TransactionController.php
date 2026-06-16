<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Transaction;
use App\Models\TransactionDetail;
use App\Models\Product;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\JsonResponse;

class TransactionController extends Controller
{// Ambil semua data riwayat transaksi untuk ditampilkan di React
public function index(): JsonResponse
{
    // Mengambil semua transaksi terbaru (teratas) beserta item menu di dalamnya
    $transactions = Transaction::with('details.product')
        ->orderBy('created_at', 'desc')
        ->get();

    return response()->json($transactions, 200);
}
    public function store(Request $request): JsonResponse
    {

        // 1. Validasi data kiriman dari halaman Kasir POS React
        $request->validate([
            'customer_name' => 'required|string',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
        ]);

        // 2. Amankan proses dengan DB Transaction
        DB::beginTransaction();

        try {
            $totalPrice = 0;
            $totalQuantity = 0;
            $validatedItems = [];

            // Looping pertama: Menghitung akumulasi total harga berdasarkan menu yang dipilih
            foreach ($request->items as $item) {
                $product = Product::find($item['product_id']);

                $subTotal = $product->price * $item['quantity'];
                $totalPrice += $subTotal;
                $totalQuantity += $item['quantity'];

                // Kumpulkan data produk yang siap dimasukkan ke tabel detail
                $validatedItems[] = [
                    'product_id' => $product->id,
                    'quantity' => $item['quantity'],
                    'price' => $product->price
                ];
            }

            // 3. Masukkan data ke tabel induk (transactions)
            $transaction = Transaction::create([
                'customer_name' => $request->customer_name,
                'total_quantity' => $totalQuantity,
                'total_price' => $totalPrice,
            ]);

            // 4. Masukkan semua item pesanan ke tabel anak (transaction_details)
            foreach ($validatedItems as $vItem) {
                TransactionDetail::create([
                    'transaction_id' => $transaction->id,
                    'product_id' => $vItem['product_id'],
                    'quantity' => $vItem['quantity'],
                    'price' => $vItem['price'],
                ]);
            }

            // Jika semua baris kode di atas sukses tanpa kendala, simpan permanen ke database
            DB::commit();

            return response()->json([
                'status' => 'success',
                'message' => 'Transaksi Warung Patria berhasil disimpan!',
                'data' => $transaction->load('details.product') // Memberikan data balik ke React untuk keperluan struk/nota
            ], 201);

        } catch (\Exception $e) {
            // Batalkan semua penyimpanan jika di tengah jalan terdeteksi error sistem
            DB::rollBack();
            return response()->json([
                'status' => 'error',
                'message' => 'Gagal memproses transaksi: ' . $e->getMessage()
            ], 500);
        }
    }
}
