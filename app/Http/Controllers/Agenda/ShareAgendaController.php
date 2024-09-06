<?php

namespace App\Http\Controllers\Agenda;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\Agenda;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Symfony\Component\HttpFoundation\Response;


class ShareAgendaController extends Controller
{
    public function users(Request $request, Agenda $agenda): AnonymousResourceCollection {

        return UserResource::collection(
            User::query()->with(['agendas' => function ($query) use ($agenda) {
                return $query->where('agenda_id', $agenda->id);
            }])
                ->whereNot('id', auth()->user()->id)
                ->paginate()
        );
    }
    public function share(Request $request, Agenda $agenda, User $user): JsonResponse {

        $validatedData = $request->validate([
            'can_see' => 'required|boolean',
            'can_edit' => 'required|boolean'
        ]);

        $agenda->users()->detach($user);

        $agenda->users()->attach($user, [
            'can_see'=> $validatedData['can_see'],
            'can_edit'=> $validatedData['can_edit'],
        ]);

        return response()->json(['message' => 'Agenda shared'], Response::HTTP_OK);
    }

}
