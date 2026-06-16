<?php

namespace App\Http\Controllers;


use App\Models\Product; // Pastikan baris ini ada untuk menghubungkan ke database
use Illuminate\Http\Request; // Pastikan ini di-import paling atas
use Illuminate\Http\JsonResponse;

class ProductController extends Controller
{

    public function index(Request $request): JsonResponse
{
    // Mengambil keyword pencarian dari parameter (?q=...)
    $query = $request->query('q');

    // Jika ada keyword, cari yang namanya mirip. Jika tidak ada, ambil semua produk.
    $products = Product::when($query, function ($search, $query) {
        return $search->where('title', 'like', '%' . $query . '%');
    })->get();

    return response()->json($products, 200);
}
    /**
     * Menampilkan detail produk berdasarkan ID untuk React
     */
    public function show($id): JsonResponse
    {
        // 1. Cari data produk di database berdasarkan ID (1, 2, 3, dst)
        $product = Product::find($id);

        // 2. Jika menu tidak ditemukan di database, kirim error 404
        if (!$product) {
            return response()->json([
                'status' => 'error',
                'message' => 'Menu produk tidak ditemukan!'
            ], 404);
        }

        // 3. Jika ada, kirim data produk asli ke React dengan status 200 OK
        return response()->json($product, 200);
    }
}
