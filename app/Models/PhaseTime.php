<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PhaseTime extends Model
{
    protected $fillable = [
        'file_id',
        'phase',
        'startTime',
        'endTime',
    ];

    public function file()
    {
        return $this->belongsTo(File::class);
    }
}
