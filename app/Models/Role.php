<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory;
    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $fillable = [
        'id',
        'name',
        'isPhase1Access',
        'isPhase2Access',
        'isPhase3Access',
        'isPhase4Access',
        'canApprovePhase1',
        'canApprovePhase2',
        'canApprovePhase3',
        'canApprovePhase4',
        'canAppeal',
        'canApprove',
        'canInsertData',
        'canComment',
    ];
    public function positions()
    {
        return $this->hasMany(Position::class);
    }
}
