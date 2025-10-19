<?php

namespace App\Http\Controllers;

use App\Models\Secret;
use App\Http\Requests\StoreSecretRequest;
use App\Http\Requests\UpdateSecretRequest;

class SecretController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSecretRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Secret $secret)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Secret $secret)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSecretRequest $request, Secret $secret)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Secret $secret)
    {
        //
    }
}
