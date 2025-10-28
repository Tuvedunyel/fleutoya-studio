<?php

namespace App\Http\Controllers;

use App\Http\Resources\SecretResource;
use App\Mail\SecretMail;
use App\Models\Secret;
use App\Http\Requests\StoreSecretRequest;
use App\Http\Requests\UpdateSecretRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Random\RandomException;

class SecretController extends Controller
{
    protected string $cipher = 'AES-256-CBC';

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('secrets/index', [
            'collection' => SecretResource::collection(Secret::paginate(10)),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     * @throws RandomException
     */
    public function store(StoreSecretRequest $request)
    {
        $currentDateTime = now();
        $expiresAt = $currentDateTime->addDays(7);
        $randomKey = bin2hex(random_bytes(16));

        $key = hash('sha256', $randomKey, true);
        $iv = hex2bin($randomKey);

        Secret::create([
            'user_id' => auth()->id(),
            'name' => $request->validated(['name']),
            'title' => $request->validated(['title']),
            'recipient' => $request->validated(['recipient']),
            'message' => $request->validated(['message']),
            'secret' => openssl_encrypt($request->validated(['secret']), $this->cipher, $key, 0, $iv),
            'status' => 'sent',
            'expires_at' => $expiresAt,
        ]);

        $sending_secret = Secret::where('title', $request->validated(['title']))
            ->where('recipient', $request->validated(['recipient']))
            ->where('user_id', auth()->id())
            ->where('expires_at', $expiresAt)
            ->first();

        $data = [
            'recipient' => $request->validated(['recipient']),
            'title' => $request->validated(['title']),
            'message' => $request->validated(['message']),
            'link' => route('secrets.show', ['secret' => $sending_secret->id, 'key' => $randomKey])
        ];

        Mail::to($request->validated(['recipient'])->send(new SecretMail($data)));

        return to_route('secrets.index')->with('success', 'Le secret a été créé et envoyé par email.');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $secret = new Secret();

        return Inertia::render('secrets/create', [
            'secret' => $secret,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Secret $secret, Request $request)
    {

        if ($secret->status === 'deleted') {
            abort(404, 'Ce secret a déjà été consulté et ne peut plus être affiché.');
        }

        if (!$request->has('key')) {
            abort(404, 'Ce secret n\'existe pas.');
        }

        $key = hash('sha256', $request->key, true);
        $iv = hex2bin($request->key);
        $decryptedSecret = openssl_decrypt($secret->secret, $this->cipher, $key, 0, $iv);

        if (!$decryptedSecret) {
            abort(403, 'La clé fournise n\'est pas valide.');
        }

        return Inertia::render('secrets/show', [
            'collection' => new SecretResource($secret),
            'decryptedSecret' => $decryptedSecret,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Secret $secret, Request $request)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSecretRequest $request, Secret $secret)
    {
        if (!$request->has('key')) {
            abort(404, 'Ce secret n\'existe pas.');
        }

        $key = hash('sha256', $request->key, true);
        $iv = hex2bin($request->key);
        $decryptedSecret = openssl_decrypt($secret->secret, $this->cipher, $key, 0, $iv);

        if (!$decryptedSecret) {
            abort(403, 'La clé fournise n\'est pas valide.');
        }

        $secret->status = 'deleted';
        $secret->secret = 'Ce secret a déjà été consulté et ne peut plus être affiché.';
        $secret->save();

        return Inertia::render('secrets/show', [
            'collection' => new SecretResource($secret),
            'decryptedSecret' => $decryptedSecret,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Secret $secret)
    {
        $secret->delete();
        return to_route('secrets.index')->with('success', 'Le secret a été supprimé . ');
    }
}
