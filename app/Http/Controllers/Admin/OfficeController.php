<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\ResponseHelper;
use App\Http\Controllers\Controller;
use App\Models\Office;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class OfficeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $offices = Office::all();

            return ResponseHelper::successRes('Berhasill mendapatkan data kantor', $offices);
        } catch (\Exception $e) {
            return ResponseHelper::errorRes($e->getMessage());
        }
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
        try {
            $request->validate([
                'code' => 'required',
                'name' => 'required',
            ], [
                'code.required' => 'Kode kantor wajib diisi',
                'name.required' => 'Nama kantor wajib diisi',
            ]);

            $office = Office::create([
                'id' => Str::uuid(),
                'code' => $request->code,
                'name' => $request->name,
            ]);

            return ResponseHelper::successRes('Berhasill menambahkan data kantor', $office);
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
                'code' => 'required',
                'name' => 'required',
            ], [
                'code.required' => 'Kode kantor wajib diisi',
                'name.required' => 'Nama kantor wajib diisi',
            ]);

            $office = Office::where('id', $id)->first();
            $office->code = $request->code;
            $office->name = $request->name;
            $office->save();

            return ResponseHelper::successRes('Berhasill update data kantor', $office);
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
            $office = Office::findOrFail($id)->delete();
            return ResponseHelper::successRes('Berhasill hapus data kantor', $office);
        } catch (\Exception $e) {
            return ResponseHelper::errorRes($e->getMessage());
        }
    }
}
