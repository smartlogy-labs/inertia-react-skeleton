<?php

namespace App\Http\Modules\Tasks\Usecases;

use App\Http\Presenter\Response;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class TaskUsecase
{
    public string $className;

    public function __construct()
    {
        $this->className = "TaskUsecase";
    }

    public function getAll(array $filterData = []): array
    {
        $funcName = $this->className . ".getAll";

        $limit = $filterData['limit'] ?? 10;

        $filterStatus = $filterData['status'] ?? "";
        $filterTitle = $filterData['status'] ?? "";

        try {
            $query = DB::table('tasks');

            if (!empty($filterTitle)) {
                $query->where('title', 'like', '%' . $filterTitle . '%');
            }

            if (!empty($filterStatus)) {
                $query->where('completed', $filterStatus);
            }

            $query = $query->orderBy('id', "desc");
            $tasks = $query->paginate(10)->appends(request()->query());

            return Response::buildSuccess([
                'list' => $tasks,
                'pagination' => [
                    'limit' => (int) $limit,
                    'payload' => $filterData
                ]
            ]);
        } catch (Exception $e) {
            Log::error($e->getMessage(), ["func_name" => $funcName, 'user' => Auth::user()]);
            
            return Response::buildErrorService($e->getMessage());
        }
    }
}
