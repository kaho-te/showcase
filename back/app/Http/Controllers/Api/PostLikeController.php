<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;

class PostLikeController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(string $post)
    {
        $like = Post::find($post)->liked()->attach(auth()->id());
        return response()->json($like, 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $post)
    {
        $like = Post::find($post)->liked()->detach(auth()->id());
        return response()->json($like, 201);
    }
}
