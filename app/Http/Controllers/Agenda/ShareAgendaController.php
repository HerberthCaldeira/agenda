<?php

namespace App\Http\Controllers\Agenda;

use App\Http\Controllers\Controller;
use App\Models\Agenda;
use App\Models\User;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;


class ShareAgendaController extends Controller
{
    public function share(Request $request, Agenda $agenda, User $user) {

        $validatedData = $request->validate([
            'can_see' => 'required|boolean',
            'can_edit' => 'required|boolean'
        ]);

        $agenda->users()->attach($user, [
            'can_see'=> $validatedData['can_see'],
            'can_edit'=> $validatedData['can_edit'],
        ]);

        return response()->json(['message' => 'Agenda shared'], Response::HTTP_OK);
    }
}
