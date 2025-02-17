<?php

use Illuminate\Support\Facades\Request;

if (!function_exists('datetime_now')) {
    function datetime_now()
    {
        $utc_time = new DateTime("now", new DateTimeZone("UTC"));
        $utc_time->setTimezone(new DateTimeZone("Asia/Jakarta")); // Zona waktu +7
        return $utc_time->format("Y-m-d H:i:s");
    }
}

if (!function_exists('date_now')) {
    function date_now()
    {
        $utc_time = new DateTime("now", new DateTimeZone("UTC"));
        $utc_time->setTimezone(new DateTimeZone("Asia/Jakarta")); // Zona waktu +7
        return $utc_time->format("Y-m-d");
    }
}

if (!function_exists('base_url')) {
    function base_url($url = ""): string
    {
        $first = "";
        // if (env("APP_ENV") != "local") {
        //     $first = "/public";
        // }

        if (empty($url)) {
            return $first . "/" . Request::segments(1)[0];
        }
        if (!empty(Request::segments(1)[1])) {
            return $first . "/" . Request::segments(1)[0] . "/$url";
        }

        return $first . "/" . Request::segments(1)[0] . "/$url";
    }
}