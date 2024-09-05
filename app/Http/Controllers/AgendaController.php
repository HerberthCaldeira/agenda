<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAgendaRequest;
use App\Http\Resources\AgendaResource;
use App\Models\Agenda;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AgendaController extends Controller
{
    public function store(StoreAgendaRequest $request) {
        return AgendaResource::make(Agenda::create($request->validated()));
    }
}
