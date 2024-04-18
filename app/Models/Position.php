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
        'office_id',
        'role_id',
    ];

    /**
     * Get the office that owns the position.
     */
    public function office()
    {
        return $this->belongsTo(Office::class);
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
}
