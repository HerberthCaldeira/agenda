<?php

use App\Models\Agenda;
use App\Models\User;

it('should be able to delete agenda', function () {
    $user = User::factory()->create();

    $agenda = Agenda::factory()->create();

    $this->actingAs($user);

    $response = $this->deleteJson(route('agenda.destroy', ['agenda'=> $agenda->id]));

    $response->assertNoContent();

    $this->assertSoftDeleted($agenda);
});
