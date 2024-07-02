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
            'Plafon',
            'Alamat',
            'No HP',
            'Sumber Order',
            'Status Kredit',
            'NIK Pemohon',
            'NIK Pasangan',
            'NIK Atas Nama Jaminan',
            'Fase Pooling',
            'Fase SLIK',
            'Fase Survei',
            'Fase Komite',
            'Fase Operation',
        ];
    }
}
