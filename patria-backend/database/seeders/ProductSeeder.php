<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{

   use WithoutModelEvents;

public function run(): void
{
    $products = [
        ['id' => 1, 'title' => 'Bandrek Susu Rempah', 'category' => 'Minuman', 'brand' => 'Warung Patria', 'price' => 15000, 'thumbnail' => 'images/bandreksusurempah.jpg'],
        ['id' => 2, 'title' => 'Teh Telor Bebek', 'category' => 'Minuman', 'brand' => 'Warung Patria', 'price' => 18000, 'thumbnail' => 'images/tehtelorbebek.jpg'],
        ['id' => 3, 'title' => 'Kopi Kasar', 'category' => 'Minuman', 'brand' => 'Warung Patria', 'price' => 10000, 'thumbnail' => 'images/kopikasar.jpg'],
        ['id' => 4, 'title' => 'Roti Bakar Srikaya', 'category' => 'Makanan', 'brand' => 'Warung Patria', 'price' => 12000, 'thumbnail' => 'images/rotibakarsrikaya.jpg'],
        ['id' => 5, 'title' => 'Indomie Goreng / Rebus', 'category' => 'Makanan', 'brand' => 'Warung Patria', 'price' => 10000, 'thumbnail' => 'images/indomie.jpg'],
    ];

    foreach ($products as $product) {
        Product::updateOrCreate(['id' => $product['id']], $product);
    }
}
}
