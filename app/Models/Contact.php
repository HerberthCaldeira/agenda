<?php

namespace App\Models;

use App\Models\traits\GlobalRelationships;
use App\Models\traits\RegisterActions;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Contact extends Model
{
    use GlobalRelationships,HasFactory, RegisterActions, SoftDeletes;

    protected $table = 'contacts';

    protected $fillable = [
        'agenda_id',
        'name',
        'email',
        'phone',
        'description',
    ];

    public function agenda(): BelongsTo
    {
        return $this->belongsTo(Agenda::class);
    }
}
