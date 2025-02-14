<?php

namespace App\Http\Presenter;

use App\Entities\ResponseEntity;
use App\Http\Entities\HttpStatus;

class Response
{
    public static function buildError(
        string $errorType = "",
        string $message = "",
        int $httpStatus = 422,
        mixed $errorFields = []
    ): array {
        
        return [
            "error"        => $errorType,
            "message"      => $message,
            "error_fields" => $errorFields ?? null,
            "http_status"  => $httpStatus
        ];
    }

    public static function returnGeneralError(): array
    {
        return self::buildError(
            errorType: ResponseEntity::ERROR_TYPE_SERVICE,
            message: ResponseEntity::DEFAULT_ERROR_MESSAGE,
            httpStatus: ResponseEntity::HTTP_SUCCESS
        );
    }
    public static function returnValidationError(mixed $validatorResponse): array
    {
        return self::buildError(
            errorType: ResponseEntity::ERROR_TYPE_VALIDATION,
            httpStatus: ResponseEntity::HTTP_SUCCESS,
            errorFields: $validatorResponse
        );
    }

    public static function buildErrorService(
        string $errorMessage = "",
    ) : array {
        if (env("APP_DEBUG")) {
            dd($errorMessage);
        }
        
        return self::buildError(
            errorType: ResponseEntity::ERROR_TYPE_SERVICE,
            message: ResponseEntity::DEFAULT_ERROR_MESSAGE,
            httpStatus: ResponseEntity::HTTP_FAILED_PROCESS
        );
    }

    public static function returnSuccess(
        array $data = [],
        int $httpStatus = 200,
        string $message = "Success"
    ): array {
        return [
            "data"        => $data,
            "http_status" => $httpStatus,
            "message"     => $message
        ];
    }

    public static function buildSuccessCreated(array $data = []): array
    {
        return self::returnSuccess(
            data: $data,
            httpStatus: ResponseEntity::HTTP_SUCCESS_CREATED,
            message: ResponseEntity::SUCCESS_MESSAGE_CREATED
        );
    }

    public static function buildSuccess(array $data = [], string $message = ""): array
    {
        return self::returnSuccess(
            data: $data,
            httpStatus: ResponseEntity::HTTP_SUCCESS,
            message: $message ?? ResponseEntity::SUCCESS_MESSAGE
        );
    }
}
