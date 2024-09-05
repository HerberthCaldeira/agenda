<?php

use App\Models\Agenda;
use App\Models\User;

it('should be able to edit a agenda', function () {

    $user = User::factory()->create();

    $agenda = Agenda::factory()->create();

    $data = Agenda::factory()->make();

    $this->actingAs($user);

    $response = $this->putJson(route('agenda.update', ['agenda' => $agenda->id]), $data->toArray());

    //refresh from database
    $agenda->refresh();

    $response->assertJson(['data' => $agenda->only(['id', 'name'])]);

    $response->assertOk();

    $this->assertDatabaseCount('agendas', 1);

    $this->assertDatabaseHas('agendas', $agenda->toArray());

});

it('should be able to return agenda to edit', function () {

    $user = User::factory()->create();

    $agenda = Agenda::factory()->create();

    $this->actingAs($user);

    $response = $this->getJson(route('agenda.edit', ['agenda' => $agenda->id]));

    $response->assertJson(['data' => $agenda->only(['id', 'name'])]);

    $response->assertOk();

});

it('should not be able to edit a agenda if user is unauthenticated', function () {

    $agenda = Agenda::factory()->create();

    $data = Agenda::factory()->make();

    $response = $this->putJson(route('agenda.update', ['agenda' => $agenda->id]), $data->toArray());

    $response->assertUnauthorized();

    $this->assertDatabaseCount('agendas', 1);

    $this->assertDatabaseMissing('agendas', $data->toArray());
});

it('should be able to validate before edit a agenda', function ($f, $v) {
    $agenda = Agenda::factory()->create();

    $user = User::factory()->create();

    $this->actingAs($user);

    $response = $this->putJson(route('agenda.update', ['agenda' => $agenda->id]), [
        $f => $v,
    ]);

    $response->assertUnprocessable();

    $response->assertJsonValidationErrors($f);

    $this->assertDatabaseMissing('agendas', [$f => $v]);

})->with([
    'name::required' => ['field' => 'name', 'value' => ''],
    'name::max' => ['field' => 'name', 'value' => str_repeat('*', 256)],
]);
