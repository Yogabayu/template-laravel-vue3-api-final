<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Office extends Model
{
    use HasFactory;
    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $fillable = [
        'id',
        'code',
        'name',
    ];
    public function positions()
    {
        return $this->belongsToMany(Position::class, 'positiontooffices', 'office_id', 'position_id');
    }
    public function notificationConfigurations()
    {
        return $this->hasMany(NotificationConfiguration::class);
    }
}
