<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Position extends Model
{
    use HasFactory;
    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $fillable = [
        'id',
        'name',
        'role_id',
    ];

    public function offices()
    {
        return $this->belongsToMany(Office::class, 'positiontooffices', 'position_id', 'office_id');
    }
    /**
     * Get the role that owns the position.
     */
    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    public function users()
    {
        return $this->hasMany(User::class);
    }

    public function notificationConfigurations()
    {
        return $this->hasMany(NotificationConfiguration::class);
    }

    public function phasedurations()
    {
        return $this->hasMany(PhaseDuration::class);
    }

    public function positionToOffices()
    {
        return $this->hasMany(PositionToOffice::class);
    }
}
