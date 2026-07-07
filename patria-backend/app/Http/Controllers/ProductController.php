<?php

namespace App\Http\Controllers;

use App\Models\Product; // Pastikan baris ini ada untuk menghubungkan ke database
use Illuminate\Http\Request; // Pastikan ini di-import paling atas
use Illuminate\Http\JsonResponse;

class ProductController extends Controller
{
    /**
     * Menampilkan semua produk atau pencarian berdasarkan keyword (?q=...)
     */
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

    /**
     * 1. TAMBAH PRODUK BARU (Create)
     */
    public function store(Request $request): JsonResponse
    {
        // Validasi data yang dikirim oleh React
        $request->validate([
            'title' => 'required|string|max:255',
            'price' => 'required|numeric',
            'stock' => 'required|integer',
        ]);

        // Simpan data baru ke dalam tabel products
        // Catatan: Jika database Anda menyimpan format harga dibagi 1000 (misal 15 untuk Rp 15.000),
        // Anda bisa mengubahnya menjadi: $request->price / 1000
        $product = Product::create([
            'title' => $request->title,
            'price' => $request->price,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Produk berhasil ditambahkan!',
            'data' => $product
        ], 201);
    }

    /**
     * 2. EDIT / UPDATE DATA PRODUK (Update)
     */
    public function update(Request $request, $id): JsonResponse
    {
        // Cari produk berdasarkan ID yang ingin diubah
        $product = Product::find($id);

        if (!$product) {
            return response()->json([
                'status' => 'error',
                'message' => 'Produk tidak ditemukan!'
            ], 404);
        }

        // Validasi inputan baru dari React
        $request->validate([
            'title' => 'required|string|max:255',
            'price' => 'required|numeric',
        ]);

        // Eksekusi perubahan data di database
        $product->update([
            'title' => $request->title,
            'price' => $request->price,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Produk berhasil diperbarui!',
            'data' => $product
        ], 200);
    }

    /**
     * 3. HAPUS PRODUK (Delete)
     */
    public function destroy($id): JsonResponse
    {
        // Cari produk berdasarkan ID yang ingin dihapus
        $product = Product::find($id);

        if (!$product) {
            return response()->json([
                'status' => 'error',
                'message' => 'Produk tidak ditemukan!'
            ], 404);
        }

        // Hapus data secara permanen dari database
        $product->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Produk berhasil dihapus dari sistem!'
        ], 200);
    }
}
