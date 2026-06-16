<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\DashboardController;

// Jalur aman tanpa gangguan CSRF token mismatch
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);
Route::get('/transactions', [TransactionController::class, 'index']);
Route::post('/transactions', [TransactionController::class, 'store']);
Route::get('/reports/omzet', [ReportController::class, 'getOmzetReport']);
Route::post('/login', [DashboardController::class, 'login']);
Route::get('/dashboard/summary', [DashboardController::class, 'getDashboardSummary']);
// Rute Tambahan untuk Modul CRUD Produk
Route::post('/products', [ProductController::class, 'store']);         // Untuk Tambah
Route::put('/products/{id}', [ProductController::class, 'update']);     // Untuk Simpan Edit
Route::delete('/products/{id}', [ProductController::class, 'destroy']); // Untuk Hapus

