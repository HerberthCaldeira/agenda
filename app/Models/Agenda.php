<?php

namespace App\Models;

use App\Models\traits\GlobalRelationships;
use App\Models\traits\RegisterActions;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Agenda extends Model
{
    use GlobalRelationships, HasFactory, RegisterActions, SoftDeletes;

    protected $table = 'agendas';

    protected $fillable = ['name', 'created_by', 'updated_by', 'deleted_by'];

    public function contacts(): HasMany
    {
        return $this->hasMany(Contact::class);
    }

    public function users(): BelongsToMany {
        return $this
            ->belongsToMany(User::class, 'agenda_user', 'agenda_id', 'user_id')
            ->withPivot(['can_see', 'can_edit']);
    }


}
