<?php

namespace App\Policies;

use App\Models\Agenda;
use App\Models\Contact;
use App\Models\User;
use Illuminate\Auth\Access\Response;
use Illuminate\Support\Facades\DB;

class ContactPolicy
{

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Contact $contact): bool
    {
        $contact->loadMissing('agenda');

        return $user->id == $contact->agenda->created_by || DB::table('agenda_user')
                ->where('user_id', $user->id)
                ->where('agenda_id', $contact->agenda->id)
                ->where('can_edit', true)
                ->exists();
    }


}
