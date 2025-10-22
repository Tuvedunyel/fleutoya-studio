<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        return Inertia::render('user/index', [
            'collection' => UserResource::collection(User::paginate(10))
        ]);
    }

    public function destroy(User $user)
    {
        $user->delete();

        return to_route('user.index')->with('success', 'User deleted successfully.');
    }
}
