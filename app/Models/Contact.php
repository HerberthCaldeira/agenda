<?php

namespace App\Models;

use App\Models\traits\GlobalRelationships;
use App\Models\traits\RegisterActions;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    use HasFactory, GlobalRelationships, RegisterActions;

    protected $table = 'contacts';
    protected $fillable = [
        'name',
        'email',
        'phone',
        'description',
    ];
}
