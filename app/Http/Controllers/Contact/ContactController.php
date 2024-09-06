<?php

namespace App\Http\Controllers\Contact;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreContactRequest;
use App\Http\Requests\UpdateContactRequest;
use App\Http\Resources\ContactResource;
use App\Models\Agenda;
use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Response;

class ContactController extends Controller
{
    public function index(Request $request, Agenda $agenda): AnonymousResourceCollection
    {
        return ContactResource::collection(
            Contact::query()
                ->with(['agenda.users' => fn($q) => $q->where('user_id', auth()->id())])
                ->where(['agenda_id' => $agenda->id])

                ->paginate()
        );
    }

    public function store(StoreContactRequest $request, Agenda $agenda): JsonResource
    {
        $item = Contact::create($request->validated());
        $item->load('agenda');
        return ContactResource::make($item);
    }

    public function edit(Request $request, Agenda $agenda, Contact $contact): JsonResource
    {
        return ContactResource::make($contact->load('agenda'));
    }

    public function update(UpdateContactRequest $request, Agenda $agenda, Contact $contact): JsonResource
    {
        //abort_if($agenda->created_by !== auth()->id(), Response::HTTP_FORBIDDEN);

        $contact->update($request->validated());
        $contact->load('agenda');
        return ContactResource::make($contact);
    }

    public function destroy(Request $request, Agenda $agenda, Contact $contact): Response
    {
        $contact->delete();
        return response()->noContent();
    }
}
