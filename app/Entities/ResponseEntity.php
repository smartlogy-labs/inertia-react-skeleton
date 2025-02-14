<?php

namespace App\Entities;

class ResponseEntity
{
    const ERROR_TYPE_VALIDATION = "VALIDATION FAILED";
    const ERROR_TYPE_SERVICE = "SERVICE ERROR";
    const ERROR_TYPE_UNAUTHENTICATED = "UNAUTHENTICATED";

    const DEFAULT_ERROR_MESSAGE =
    'Maaf, terjadi kesalahan pada Sistem. ' .
        'Coba kembali atau silahkan hubungi Tim Pengembang Aplikasi';
    const ERROR_MESSAGE_LOGIN =
    'Email/Password salah, periksa dan coba kembali!';
    const ERROR_MESSAGE_UNAUTH =
    'Maaf, anda sudah tidak memiliki akses, silahkan Login kembali';

    const SUCCESS_MESSAGE =
    'Success';
    const SUCCESS_MESSAGE_CREATED =
    'Data berhasil ditambahkan!';
    const SUCCESS_MESSAGE_UPDATED =
    'Perubahan data berhasil disimpan!';
    const SUCCESS_MESSAGE_DELETED =
    'Data berhasil dihapus!';

    const HTTP_SUCCESS = 200;
    const HTTP_SUCCESS_CREATED = 201;
    const HTTP_FAILED_PROCESS = 422;
    const HTTP_UNAUTHORIZE = 401;

    public static function getSuccessCreateMsg($name): string
    {
        return "Penambahan Data $name berhasil disimpan!";
    }

    public static function getSuccessUpdateMsg($name): string
    {
        return "Perubahan Data $name berhasil disimpan!";
    }
}
