<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\TransactionController;

Route::get('/', function () {
    return view('welcome');
});

// Jalur aman tanpa gangguan CSRF token mismatch
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);
Route::get('/transactions', [TransactionController::class, 'index']);
Route::post('/transactions', [TransactionController::class, 'store']);
