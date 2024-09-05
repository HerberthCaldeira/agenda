<?php

use App\Models\Agenda;
use App\Models\Contact;
use App\Models\User;

it('should be able to delete contact', function () {
    $user = User::factory()->create();

    $contact = Contact::factory()->for(Agenda::factory())->create();

    $this->actingAs($user);

    $response = $this->deleteJson(route('contact.destroy', ['agenda' => $contact->agenda->id, 'contact' => $contact->id]));

    $response->assertNoContent();

    $this->assertSoftDeleted('contacts', ['id' => $contact->id]);

});
