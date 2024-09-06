<?php

use App\Models\Agenda;
use App\Models\User;

it('should be return users for share agenda', function () {

    $user = User::factory()->create();
    $agenda = Agenda::factory()->create();
    $agenda->created_by = $user->id;
    $user->save();

    $user2 = User::factory(['name' => 'Joe Doe'])->create();

    $user3 = User::factory(['name' => 'Peter has agenda already'])->create();
    $agenda->users()->attach($user3, [
        'can_see' => 1,
        'can_edit' => 1,
    ]);

    $this->actingAs($user);

    $response = $this->getJson(route('agenda.users', ['agenda' => $agenda->id]));

    $response->assertOk();

    $response->assertJson(['data' => [
        array_merge($user2->only(['id', 'name']), ['agendas' => []]),
        $user3->only(['id', 'name']),
    ],
    ]);

    $response->assertJsonCount(2, 'data');
});

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
            'user' => $userForGainPermission,
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
