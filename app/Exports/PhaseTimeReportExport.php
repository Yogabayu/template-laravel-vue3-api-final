<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\WithHeadings;

class PhaseTimeReportExport implements FromArray, WithHeadings
{
    protected $data;

    public function __construct(array $data)
    {
        $this->data = $data;
    }

    public function array(): array
    {
        return $this->data;
    }

    public function headings(): array
    {
        return [
            'No',
            'AO / RO',
            'Nama Kredit',
            'Tahapan Kredit',
            'Plafon',
            'Tipe Kredit',
            'Status',
            'Keterangan ditolak',
            'Alamat',
            'No HP',
            'Sumber Order',
            'Status Kredit',
            'NIK Pemohon',
            'NIK Pasangan',
            'NIK Atas Nama Jaminan',
            'Fase Pooling (Durasi)',
            'Fase Pooling (Dibuat)',
            'Fase SLIK (Durasi)',
            'Fase SLIK (Dibuat)',
            'Fase Survei (Durasi)',
            'Fase Survei (Dibuat)',
            'Fase Komite (Durasi)',
            'Fase Komite (Dibuat)',
            'Fase Operation (Durasi)',
            'Fase Operation (Dibuat)',
        ];
    }
}
