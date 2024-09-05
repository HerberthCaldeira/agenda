<?php

use App\Models\Agenda;
use App\Models\Contact;
use App\Models\User;


it('should be able to update a contact', function () {

    $user = User::factory()->create();

    $contact = Contact::factory()->for(Agenda::factory())->create();

    $data = Contact::factory(['name' => 'teste'])->make();

    $this->actingAs($user);

    $response = $this->putJson(route('contact.update', ['agenda' => $contact->agenda, 'contact' => $contact ]), $data->toArray());

    $response->assertOk();

    $response->assertJson([
        'data' => array_merge($data->toArray(), [
            'agenda' => $contact->agenda->only(['id', 'name'])
        ])
    ]);

    $this->assertDatabaseCount('contacts', 1);

    $this->assertDatabaseHas('contacts', array_merge($data->toArray(), ['updated_by' => $user->id]));

});

it('should not be able to update a contact if user is unauthenticated', function () {

    $user = User::factory()->create();

    $contact = Contact::factory()->for(Agenda::factory())->create();

    $data = Contact::factory(['name' => 'teste'])->make();

    $response = $this->putJson(route('contact.update', ['agenda' => $contact->agenda, 'contact' => $contact ]), $data->toArray());

    $response->assertUnauthorized();

});

it('should be able to validate before update a contact', function ($f, $v) {
    $user = User::factory()->create();

    $contact = Contact::factory()->for(Agenda::factory())->create();

    $this->actingAs($user);

    $response = $this->putJson(
        route('contact.update', ['agenda' => $contact->agenda, 'contact' => $contact]), [
        $f => $v,
    ]);

    $response->assertUnprocessable();

    $response->assertJsonValidationErrors($f);

    $this->assertDatabaseMissing('contacts', [$f => $v]);

})->with([
    'name::required' => ['field' => 'name', 'value' => ''],
    'name::max' => ['field' => 'name', 'value' => str_repeat('*', 256)],
    'email::required' => ['field' => 'email', 'value' => ''],
    'email::max' => ['field' => 'email', 'value' => str_repeat('*', 256)],
    'phone::required' => ['field' => 'phone', 'value' => ''],
    'phone::max' => ['field' => 'email', 'value' => str_repeat('*', 21)],
    'description::required' => ['field' => 'description', 'value' => ''],
    'description::max' => ['field' => 'description', 'value' => str_repeat('*', 256)],
]);

