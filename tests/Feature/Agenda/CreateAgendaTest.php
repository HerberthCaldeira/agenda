<?php

use App\Models\Agenda;
use App\Models\User;

it('should be able to create an agenda', function () {
    $user = User::factory()->create();

    $data = Agenda::factory()->make();

    $this->actingAs($user);

    $response = $this->postJson(route('agenda.store'), $data->toArray());

    $response->assertJson(['data' => $data->toArray()]);

    $response->assertCreated();

    $this->assertDatabaseCount('agendas', 1);

    $this->assertDatabaseHas('agendas', $data->toArray());

});

it('should not be able to create an agenda if user is unauthenticated', function () {

    $data = Agenda::factory()->make();

    $response = $this->postJson(route('agenda.store'), $data->toArray());

    $response->assertUnauthorized();

    $this->assertDatabaseCount('agendas', 0);
});


it('should be able to validate before create a agenda', function ($f, $v) {
    $user = User::factory()->create();

    $this->actingAs($user);

    $response = $this->postJson(route('agenda.store'), [
        $f => $v,
    ]);

    $response->assertUnprocessable();

    $response->assertJsonValidationErrors($f);

    $this->assertDatabaseMissing('agendas', [$f => $v]);

})->with([
    'name::required' => [ 'field' =>'name', 'value' => ''],
    'name::max' => [ 'field' =>'name', 'value' => str_repeat('*',256)],
]);

