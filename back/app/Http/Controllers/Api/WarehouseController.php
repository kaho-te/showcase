<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Warehouse;
use Illuminate\Http\Request;

class WarehouseController extends Controller
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
    public function store(Request $request)
    {
        $user = $request->user();
        $userId = $user->id;

        if(is_null($request->file('threed_data'))){
            return response()->json('3Dデータが指定されていません。');
        }

        $threedFile = $request->file('threed_data')->store('public/threed/' . $userId);
        $filename = basename($threedFile);

        $warehouse = $user->warehouses()->create([
            'threed_data' => $filename
        ]);
        return response()->json($warehouse, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show()
    {
        $warehouses = Warehouse::where('user_id',auth()->id())->latest()->get();

        return response()->json($warehouses);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Warehouse $warehouse)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Warehouse $warehouse)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Warehouse $warehouse)
    {
        //
    }
}
