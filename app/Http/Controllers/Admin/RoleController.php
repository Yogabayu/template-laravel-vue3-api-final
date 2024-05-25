<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\ResponseHelper;
use App\Http\Controllers\Controller;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            return ResponseHelper::successRes('Berhasill mendapatkan data role', Role::all());
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
                'name' => 'required',
                'isPhase1Access' => 'required',
                'isPhase2Access' => 'required',
                'isPhase3Access' => 'required',
                'isPhase4Access' => 'required',
                'canDownload' => 'required',
                // 'isSecret' => 'required',
                // 'canApprovePhase1' => 'required',
                // 'canApprovePhase2' => 'required',
                // 'canApprovePhase3' => 'required',
                // 'canApprovePhase4' => 'required',
                // 'canAppeal' => 'required',
                // 'canInsertData' => 'required',
                // 'canComment' => 'required',
            ], [
                'name.required' => 'Nama wajib diisi',
                'isPhase1Access.required' => 'Phase 1 Access Wajib diisi',
                'isPhase2Access.required' => 'Phase 2 Access Wajib diisi',
                'isPhase3Access.required' => 'Phase 3 Access Wajib diisi',
                'isPhase4Access.required' => 'Phase 4 Access Wajib diisi',
                'canDownload.required' => 'Role Download wajib diisi',
                // 'isSecret.required' => 'Slik Access Wajib diisi',
                // 'canApprovePhase1.required' => 'Approve Phase 1 Access Wajib diisi',
                // 'canApprovePhase2.required' => 'Approve Phase 1 Access Wajib diisi',
                // 'canApprovePhase3.required' => 'Approve Phase 1 Access Wajib diisi',
                // 'canApprovePhase4.required' => 'Approve Phase 1 Access Wajib diisi',
                // 'canAppeal.required' => 'Akses Banding Wajib diisi',
                // 'canInsertData.required' => 'Akses Tambah Data Wajib diisi',
                // 'canComment.required' => 'Akses Komentar Wajib diisi',
            ]);

            // Jika validasi Berhasill, simpan data
            $role = new Role();
            $role->id = Str::uuid();
            $role->name = $request->name; // Mengambil nilai 'name' dari dataForm
            $role->isPhase1Access = $request->isPhase1Access;
            $role->isPhase2Access = $request->isPhase2Access;
            $role->isPhase3Access = $request->isPhase3Access;
            $role->isPhase4Access = $request->isPhase4Access;
            $role->canDownload = $request->canDownload;
            // $role->isSecret = $request->isSecret;
            // $role->canApprovePhase1 = $request->canApprovePhase1;
            // $role->canApprovePhase2 = $request->canApprovePhase2;
            // $role->canApprovePhase3 = $request->canApprovePhase3;
            // $role->canApprovePhase4 = $request->canApprovePhase4;
            // $role->canAppeal =  $request->canAppeal;
            // $role->canApprove =  $request->canApprove;
            // $role->canInsertData =  $request->canInsertData;
            // $role->canComment =  $request->canComment;
            $role->save();

            return ResponseHelper::successRes('Berhasill input data role', $role);
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
                'isPhase1Access' => 'required',
                'isPhase2Access' => 'required',
                'isPhase3Access' => 'required',
                'isPhase4Access' => 'required',
                'canDownload' => 'required',
                // 'isSecret' => 'required',
                // 'canApprovePhase1' => 'required',
                // 'canApprovePhase2' => 'required',
                // 'canApprovePhase3' => 'required',
                // 'canApprovePhase4' => 'required',
                // 'canAppeal' => 'required',
                // 'canInsertData' => 'required',
                // 'canComment' => 'required',
            ], [
                'name.required' => 'Nama wajib diisi',
                'isPhase1Access.required' => 'Phase 1 Access Wajib diisi',
                'isPhase2Access.required' => 'Phase 2 Access Wajib diisi',
                'isPhase3Access.required' => 'Phase 3 Access Wajib diisi',
                'isPhase4Access.required' => 'Phase 4 Access Wajib diisi',
                'canDownload.required' => 'Role Download wajib diisi',
                // 'isSecret.required' => 'Slik Access Wajib diisi',
                // 'canApprovePhase1.required' => 'Approve Phase 1 Access Wajib diisi',
                // 'canApprovePhase2.required' => 'Approve Phase 1 Access Wajib diisi',
                // 'canApprovePhase3.required' => 'Approve Phase 1 Access Wajib diisi',
                // 'canApprovePhase4.required' => 'Approve Phase 1 Access Wajib diisi',
                // 'canAppeal.required' => 'Akses Banding Wajib diisi',
                // 'canInsertData.required' => 'Akses Tambah Data Wajib diisi',
                // 'canComment.required' => 'Akses Komentar Wajib diisi',
            ]);

            $role = Role::where('id', $id)->first();
            $role->name = $request->name; // Mengambil nilai 'name' dari dataForm
            $role->isPhase1Access = $request->isPhase1Access;
            $role->isPhase2Access = $request->isPhase2Access;
            $role->isPhase3Access = $request->isPhase3Access;
            $role->isPhase4Access = $request->isPhase4Access;
            $role->canDownload = $request->canDownload;
            // $role->isSecret = $request->isSecret;
            // $role->canApprovePhase1 = $request->canApprovePhase1;
            // $role->canApprovePhase2 = $request->canApprovePhase2;
            // $role->canApprovePhase3 = $request->canApprovePhase3;
            // $role->canApprovePhase4 = $request->canApprovePhase4;
            // $role->canAppeal =  $request->canAppeal;
            // $role->canApprove =  $request->canApprove;
            // $role->canInsertData =  $request->canInsertData;
            // $role->canComment =  $request->canComment;
            $role->save();

            return ResponseHelper::successRes('Berhasill update data role', $role);
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
            $role = Role::findOrFail($id)->delete();
            return ResponseHelper::successRes('Berhasill hapus data role', $role);
        } catch (\Exception $e) {
            return ResponseHelper::errorRes($e->getMessage());
        }
    }
}
