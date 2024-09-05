<?php

use App\Models\Agenda;
use App\Models\User;

it('should be able to create an agenda', function () {
    $user = User::factory()->create();

    $data = Agenda::factory()->make();

    $this->actingAs($user);

    $response = $this->post(route('agenda.store'), $data->toArray());

    $response->assertCreated();

    $this->assertDatabaseCount('agendas', 1);
    $this->assertDatabaseHas('agendas', $data->toArray());

});
