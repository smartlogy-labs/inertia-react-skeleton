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
