<?php

namespace App\Models;

use App\Models\traits\GlobalRelationships;
use App\Models\traits\RegisterActions;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Agenda extends Model
{
    use HasFactory, GlobalRelationships, RegisterActions;

    protected $table = 'agendas';

    protected $fillable = ['name'];

    public function contacts(): HasMany {
        return $this->hasMany(Contact::class);
    }
}
