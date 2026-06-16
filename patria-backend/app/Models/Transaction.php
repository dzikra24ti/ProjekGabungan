<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $fillable = ['customer_name', 'total_quantity', 'total_price'];

public function details() {
    return $this->hasMany(TransactionDetail::class);
}
}
