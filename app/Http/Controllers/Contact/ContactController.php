<?php

namespace App\Http\Controllers\Contact;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreContactRequest;
use App\Http\Requests\UpdateContactRequest;
use App\Http\Resources\ContactResource;
use App\Models\Agenda;
use App\Models\Contact;
use Illuminate\Http\Resources\Json\JsonResource;

class ContactController extends Controller
{
    public function store(StoreContactRequest $request, Agenda $agenda): JsonResource
    {
        $item = Contact::create($request->validated());
        $item->load('agenda');
        return ContactResource::make($item);
    }

    public function update(UpdateContactRequest $request, Agenda $agenda, Contact $contact): JsonResource
    {
        $contact->update($request->validated());
        $contact->load('agenda');
        return ContactResource::make($contact);
    }
}
