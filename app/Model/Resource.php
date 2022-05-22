<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Resource extends Model
{
    public static function firstSerch($table, $data)
    {
        $resource = Resource::where($table, $data)->first();
        if (!is_null($resource)) {
            return $resource;
        } else {
            return false;
        }
    }

    public static function search($column, $request)
    {
        $search = Resource::where($column, $request)->exists();
        return $search;
    }
}
