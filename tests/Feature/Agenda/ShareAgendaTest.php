<?php

use App\Models\Agenda;
use App\Models\User;


it('should be able to share agenda with users', function () {

    //user with one agenda to give permission to see and edit
    $userLogged = User::factory()->create();
    $agenda = Agenda::factory()->create();
    $agenda->created_by = $userLogged->id;
    $agenda->save();


    $userForGainPermission = User::factory()->create();
    $this->actingAs($userLogged);

    $response = $this->postJson(
        route('agenda.share', [
            'agenda' => $agenda,
            'user' => $userForGainPermission
        ]),
        [
            'can_see' => true,
            'can_edit' => true,
        ]
    );

    $response->assertOk();

    $this->assertDatabaseHas('agenda_user', [
        'agenda_id' => $agenda->id,
        'user_id' => $userForGainPermission->id,
        'can_see' => 1,
        'can_edit' => 1,
    ]);

});
