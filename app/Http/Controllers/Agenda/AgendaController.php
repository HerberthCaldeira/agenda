<?php

namespace App\Http\Controllers\Agenda;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAgendaRequest;
use App\Http\Requests\UpdateAgendaRequest;
use App\Http\Resources\AgendaResource;
use App\Models\Agenda;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Response;

class AgendaController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        return AgendaResource::collection(
            Agenda::query()
                ->with('users')
                ->where(function ($query) {
                    $query->where('created_by', auth()->user()->id)
                        ->orWhereHas('users', function ($query) {
                            $query->where('user_id', auth()->user()->id)
                                ->where('can_see', true);
                        });
                })
                ->paginate()
        );
    }

    public function show(Request $request, Agenda $agenda): JsonResource
    {
        return AgendaResource::make($agenda);
    }

    public function store(StoreAgendaRequest $request): JsonResource
    {
        return AgendaResource::make(Agenda::create($request->validated()));
    }

    public function edit(Request $request, Agenda $agenda): JsonResource
    {
        return AgendaResource::make($agenda);
    }

    public function update(UpdateAgendaRequest $request, Agenda $agenda): JsonResource
    {
        $agenda->update($request->validated());

        return AgendaResource::make($agenda);
    }

    public function destroy(Request $request, Agenda $agenda): Response
    {
        $agenda->contacts()->delete();
        $agenda->delete();

        return response()->noContent();
    }
}
