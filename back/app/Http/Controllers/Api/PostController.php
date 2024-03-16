<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Models\Follow;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $followings = Follow::where('user_id',auth()->id())->get(['following_id'])->toArray();
        $posts = Post::whereIn('user_id', $followings)
            ->with('user')
            ->with('comments.user')
            ->with('warehouse')
            ->with('liked:name')
            ->latest()
            ->get();
        
        $account = User::where('id',auth()->id())
            ->with('account')
            ->get();

        return response()->json(['post' => $posts, 'account' => $account]);
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
    public function store(Request $request)
    {
        $user = $request->user();

        $post = $user->posts()->create([
            'text' => $request->text,
            'warehouse_id' => $request->warehouse_id
        ]);
        return response()->json($post, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        //
    }
}
