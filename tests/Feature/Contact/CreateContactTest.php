<?php

use App\Models\Agenda;
use App\Models\Contact;
use App\Models\User;

it('should be able to create a contact for an agenda', function () {

    $user = User::factory()->create();

    $agenda = Agenda::factory()->create();

    $data = Contact::factory()->make();

    $this->actingAs($user);

    $response = $this->postJson(route('contact.store', ['agenda' => $agenda]), $data->toArray());

    $response->assertCreated();

    $response->assertJson(['data' => array_merge($data->toArray(), ['agenda' => $agenda->only(['id', 'name'])])]);

    $this->assertDatabaseCount('contacts', 1);

    $this->assertDatabaseHas('contacts', array_merge($data->toArray(), ['created_by' => $user->id]));

});

it('should not be able to create a contact for an agenda if user is unauthenticated', function () {

    $user = User::factory()->create();

    $agenda = Agenda::factory()->create();

    $data = Contact::factory()->make();

    $response = $this->postJson(route('contact.store', ['agenda' => $agenda]), $data->toArray());

    $response->assertUnauthorized();

});

it('should be able to validate before create a agenda', function ($f, $v) {
    $user = User::factory()->create();

    $agenda = Agenda::factory()->create();

    $this->actingAs($user);

    $response = $this->postJson(
        route('contact.store', ['agenda' => $agenda]), [
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
