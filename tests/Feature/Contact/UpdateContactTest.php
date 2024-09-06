<?php

use App\Models\Agenda;
use App\Models\Contact;
use App\Models\User;
use Illuminate\Support\Facades\DB;


it('should be able to update a contact', function () {

    $user = User::factory()->create();

    $contact = Contact::factory()->for(Agenda::factory())->create();

    Agenda::query()->update(['created_by' => $user->id]);

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

    Agenda::query()->update(['created_by' => $user->id]);

    $data = Contact::factory(['name' => 'teste'])->make();

    $response = $this->putJson(route('contact.update', ['agenda' => $contact->agenda, 'contact' => $contact ]), $data->toArray());

    $response->assertUnauthorized();

});

it('should be able to return a contact to edit', function () {

    $user = User::factory()->create();

    $contact = Contact::factory()->for(Agenda::factory())->create();

    Agenda::query()->update(['created_by' => $user->id]);

    $this->actingAs($user);

    $response = $this->getJson(route('contact.edit', ['agenda' => $contact->agenda, 'contact' => $contact ]));

    $response->assertJson(['data' => array_merge(
        $contact->only(['id','name','email','phone','description']),
        [
            'agenda' => $contact->agenda->only(['id', 'name'])
        ]
    )]);

    $response->assertOk();

});


it('should be able to validate before update a contact', function ($f, $v) {
    $user = User::factory()->create();

    $contact = Contact::factory()->for(Agenda::factory())->create();

    Agenda::query()->update(['created_by' => $user->id]);

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


it('should be able to edit only if user is owner or has permission', function (){

    $user = User::factory()->create();

    $agenda = Agenda::factory()->create();

    $agenda->created_by = $user->id;

    $agenda->save();

    $contact = Contact::factory()->for($agenda)->create();

    $data = Contact::factory()->make();

    $this->actingAs($user);

    $response = $this->putJson(
        route('contact.update', ['agenda' => $contact->agenda->id, 'contact' => $contact->id ]),
        $data->toArray()

    );

    $response->assertOk();

});

it('should be able to not edit if user is not owner and not have permission', function (){

    $user = User::factory()->create();

    $agenda = Agenda::factory()->create();

    $agenda->created_by = $user->id;

    $agenda->save();

    $contact = Contact::factory()->for($agenda)->create();

    $data = Contact::factory()->make();

    $user2 = User::factory()->create();

    $this->actingAs($user2);

    $response = $this->putJson(
        route('contact.update', ['agenda' => $contact->agenda->id, 'contact' => $contact->id ]),
        $data->toArray()

    );

    $response->assertForbidden();

});

it('should be able to  edit if user is not owner but have permission', function (){

    $user = User::factory()->create();

    $agenda = Agenda::factory()->create();

    $agenda->created_by = $user->id;

    $agenda->save();

    $user2 = User::factory()->create();

    $contact = Contact::factory()->for($agenda)->create();

    DB::table('agenda_user')
        ->insert([
            'can_edit' => true,
            'can_see' => true,
            'user_id' => $user2->id,
            'agenda_id' => $contact->agenda->id
        ]);


    $data = Contact::factory()->make();


    $this->actingAs($user2);

    $response = $this->putJson(
        route('contact.update', ['agenda' => $contact->agenda->id, 'contact' => $contact->id ]),
        $data->toArray()

    );

    $response->assertOk();

});

