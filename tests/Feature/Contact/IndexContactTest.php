<?php


use App\Models\Agenda;
use App\Models\Contact;
use App\Models\User;

it('should be able to return list of contacts', function () {

    $user = User::factory()->create();

    $agenda = Agenda::factory()->create();

    $contact = Contact::factory(15)->for($agenda)->create();

    $this->actingAs($user);

    $response = $this->getJson(route('contact.index', ['agenda' => $agenda]));



    $response->assertOk();

    $response->assertJsonCount(15, 'data');

});
