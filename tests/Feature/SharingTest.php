<?php

use App\Models\Secret;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('guests are redirected to the login page', function () {
    $this->get('/dashboard/secrets/share')->assertRedirect('/login');
});

test('authenticated users can visit the share secret page', function () {
    $this->actingAs($user = User::factory()->create());

    $this->get('/dashboard/secrets/share')->assertOk();
});

test('authenticated users can share a secret', function () {
    $this->actingAs($user = User::factory()->create());

    $secret = Secret::factory()->for($user)->create();

    $response = $this->post('/dashboard/secrets', [
        'title' => $secret->title,
        'name' => 'Test',
        'message' => 'This is a test message.',
        'recipient' => $secret->recipient,
        'secret' => $secret->secret,
    ]);

    $response->assertRedirect('/dashboard/secrets');
});
