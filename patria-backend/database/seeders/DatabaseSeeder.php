<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Akun Agus (Menggunakan password asli Agus sebelumnya)
        User::create([
            'name' => 'Agus',
            'email' => 'agus@patria.com',
            'role' => 'dapur',
            'password' => Hash::make('rahasia123'), // Silakan ganti dengan password asli Agus
        ]);

        // 2. Akun Owner Baru
        User::create([
            'name' => 'Owner',
            'email' => 'owner@patria.com',
            'role' => 'owner',
            'password' => Hash::make('owner123'), // Kamu bisa ketik sendiri password bebas di sini
        ]);

        // 3. Akun Kasir Baru
        User::create([
            'name' => 'Kasir',
            'email' => 'kasir@patria.com',
            'role' => 'kasir',
            'password' => Hash::make('kasir123'), // Kamu bisa ketik sendiri password bebas di sini
        ]);

        // 4. Akun Staff Dapur Baru
        User::create([
            'name' => 'Dapur',
            'email' => 'dapur@patria.com',
            'role' => 'dapur',
            'password' => Hash::make('dapur123'), // Kamu bisa ketik sendiri password bebas di sini
        ]);

        $this->call([
            ProductSeeder::class,
        ]);
    }
}
