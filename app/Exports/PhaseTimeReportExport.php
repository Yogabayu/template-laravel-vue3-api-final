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
            'Nama Kredit',
            'Fase Pooling',
            'Fase SLIK',
            'Fase Survei',
            'Fase Komite',
            'Fase Operation',
        ];
    }
}
