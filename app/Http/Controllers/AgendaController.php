<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAgendaRequest;
use Illuminate\Http\Request;

class AgendaController extends Controller
{
    public function store(StoreAgendaRequest $request){

        ds($request->all());

    }
}
