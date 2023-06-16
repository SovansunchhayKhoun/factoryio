<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DeliveryAddresses extends Model
{
    use HasFactory;
  protected $fillable = [
    'user_id', 'address', 'latitude', 'longitude',
  ];


  public function user()
  {
    return $this->belongsTo(User::class);
  }
}