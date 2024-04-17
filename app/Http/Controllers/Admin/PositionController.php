<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\ResponseHelper;
use App\Http\Controllers\Controller;
use App\Models\Position;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PositionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $positions = Position::all();
            return ResponseHelper::successRes('Berhasil mendapatkan data jabatan', $positions);
        } catch (\Exception $e) {
            return ResponseHelper::errorRes($e->getMessage());
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required',
                'office_id' => 'required',
                'role_id' => 'required',
            ], [
                'name.required' => 'Nama wajib diisi',
                'office_id.required' => 'Kantor wajib diisi',
                'role_id.required' => 'Role wajib diisi',
            ]);

            $position = new Position();
            $position->id = Str::uuid();
            $position->name = $request->name;
            $position->office_id = $request->office_id;
            $position->role_id = $request->role_id;
            $position->save();

            return ResponseHelper::successRes('Berhasil input data jabatan', $position);
        } catch (\Exception $e) {
            return ResponseHelper::errorRes($e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            $request->validate([
                'name' => 'required',
                'office_id' => 'required',
                'role_id' => 'required',
            ], [
                'name.required' => 'Nama wajib diisi',
                'office_id.required' => 'Kantor wajib diisi',
                'role_id.required' => 'Role wajib diisi',
            ]);

            $position = Position::findOrfail($id);
            $position->name = $request->name;
            $position->office_id = $request->office_id;
            $position->role_id = $request->role_id;
            $position->save();

            return ResponseHelper::successRes('Berhasil update data jabatan', $position);
        } catch (\Exception $e) {
            return ResponseHelper::errorRes($e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $position = Position::findOrFail($id)->delete();
            return ResponseHelper::successRes('Berhasil hapus data jabatan', $position);
        } catch (\Exception $e) {
            return ResponseHelper::errorRes($e->getMessage());
        }
    }
}
