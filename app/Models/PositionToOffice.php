<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PositionToOffice extends Model
{
    use HasFactory;
    protected $table = 'positiontooffices';
    protected $fillable = [
        'position_id',
        'office_id',
    ];

    public function position()
    {
        return $this->belongsTo(Position::class);
    }

    public function office()
    {
        return $this->belongsTo(Office::class);
    }
}
