<?php

// use Illuminate\Support\Facades\Route;
// use App\Http\Controllers\ProductController;
// use App\Http\Controllers\TransactionController; // Pastikan ini di-import di atas

// Route::get('/', function () {
//     return view('welcome');
// });


// // Kita tambahkan awalan /api secara manual di sini agar struktur URL di React tetap rapi
// Route::middleware([\Illuminate\Http\Middleware\HandleCors::class])->group(function () {
//     Route::get('/api/products', [ProductController::class, 'index']);
//     Route::get('/api/products/{id}', [ProductController::class, 'show']);

// // RUTE BARU UNTUK AMBIL DATA RIWAYAT TRANSAKSI
//     Route::get('/api/transactions', [TransactionController::class, 'index']);
//     Route::post('/api/transactions', [TransactionController::class, 'store']);
// });
