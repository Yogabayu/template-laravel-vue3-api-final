<?php

namespace App\Http\Controllers;

use App\Helpers\ResponseHelper;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use ZipArchive;

class ZipController extends Controller
{
    public function downloadAll($idCredit)
    {
        try {
            $publicDir = public_path();
            $folderName = "file/{$idCredit}";
            $zipFileName = "{$idCredit}.zip";

            // Path folder yang akan di-zip
            $sourcePath = $publicDir . '/' . $folderName;

            if (!File::exists($sourcePath)) {
                return ResponseHelper::errorRes('Folder Kredit tidak ditemukan');
            }

            // Buat objek ZipArchive
            $zip = new ZipArchive;

            // Path file zip yang akan dibuat
            $zipFilePath = $publicDir . '/' . $zipFileName;

            if ($zip->open($zipFilePath, ZipArchive::CREATE | ZipArchive::OVERWRITE) === TRUE) {
                $files = new \RecursiveIteratorIterator(new \RecursiveDirectoryIterator($sourcePath));

                foreach ($files as $file) {
                    if (!$file->isDir()) {
                        $filePath = $file->getRealPath();
                        $relativePath = substr($filePath, strlen($sourcePath) + 1);

                        $zip->addFile($filePath, $relativePath);
                    }
                }

                $zip->close();

                return response()->download($zipFilePath)->deleteFileAfterSend(true);
            } else {
                return ResponseHelper::errorRes('Gagal Download File');
            }
        } catch (\Exception $e) {
            return ResponseHelper::errorRes('Gagal Download File');
        }
    }
}
