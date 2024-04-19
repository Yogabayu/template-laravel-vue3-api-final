<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\ResponseHelper;
use App\Http\Controllers\Controller;
use App\Models\Position;
use App\Models\PositionToOffice;
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
            $positions = Position::withCount('users')->with('offices', 'role')->get();
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
                'offices' => 'required|array',
                'role_id' => 'required',
            ], [
                'name.required' => 'Nama wajib diisi',
                'offices.required' => 'Office wajib diisi',
                'role_id.required' => 'Role wajib diisi',
            ]);

            $position = new Position();
            $position->id = Str::uuid();
            $position->name = $request->name;
            $position->role_id = $request->role_id;
            $position->save();

            $offices = $request->offices;
            foreach ($offices as $office) {
                $officeMapping = new PositionToOffice();
                $officeMapping->position_id = $position->id;
                $officeMapping->office_id = $office;
                $officeMapping->save();
            }

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
                'offices' => 'array',
                'role_id' => 'required',
            ], [
                'name.required' => 'Nama wajib diisi',
                'role_id.required' => 'Role wajib diisi',
            ]);

            $position = Position::findOrfail($id);
            $position->name = $request->name;
            $position->role_id = $request->role_id;
            $position->save();

            if ($request->has('offices')) {
                $position->offices()->detach();
                $position->offices()->sync($request->offices);
            }

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
            $position = Position::findOrFail($id);
            $position->offices()->detach();
            $position->delete();
            return ResponseHelper::successRes('Berhasil hapus data jabatan', $position);
        } catch (\Exception $e) {
            return ResponseHelper::errorRes($e->getMessage());
        }
    }
}
