<?php

use App\Models\Agenda;
use App\Models\User;

it('should be able to return list of agendas', function () {

    $user = User::factory()->create();

    Agenda::factory()->count(20)->create();

    $this->actingAs($user);

    $response = $this->getJson(route('agenda.index'));

    $response->assertOk();

    $response->assertJsonCount(15, 'data');

});
