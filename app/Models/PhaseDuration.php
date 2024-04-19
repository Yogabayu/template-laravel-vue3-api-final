<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PhaseDuration extends Model
{
    use HasFactory;
    protected $fillable = [
        'position_id',
        'phase',
        'duration_days',
    ];

    public function position()
    {
        return $this->belongsTo(Position::class);
    }
}
