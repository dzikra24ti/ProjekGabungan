<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
public function up(): void
{
    Schema::create('transactions', function (Blueprint $table) {
        $table->id();
        $table->string('customer_name'); // Menyimpan input "Misal: Meja 04 / Sdr. Rian"
        $table->integer('total_quantity'); // Total porsi yang dibeli
        $table->integer('total_price'); // Total bayar akhir (Rp)
        $table->timestamps(); // Otomatis mencatat waktu transaksi dibuat
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
