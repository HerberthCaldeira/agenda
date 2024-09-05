<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAgendaRequest;
use App\Http\Requests\UpdateAgendaRequest;
use App\Http\Resources\AgendaResource;
use App\Models\Agenda;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AgendaController extends Controller
{
    public function store(StoreAgendaRequest $request) {
        return AgendaResource::make(Agenda::create($request->validated()));
    }
    public function update(UpdateAgendaRequest $request, Agenda $agenda) {
        $agenda->update($request->validated());
        return AgendaResource::make($agenda);
    }
}
