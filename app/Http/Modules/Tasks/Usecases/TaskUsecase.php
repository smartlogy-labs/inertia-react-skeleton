<?php

namespace App\Http\Modules\Tasks\Usecases;

use App\Entities\ResponseEntity;
use App\Http\Presenter\Response;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

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
        $filterKeywordTitle = $filterData['keywordTitle'] ?? "";

        try {
            $query = DB::table('tasks')
                ->whereNull('deleted_at');

            if (!empty($filterKeywordTitle)) {
                $query = $query->where('title', 'like', '%' . $filterKeywordTitle . '%');
            }

            if (!empty($filterStatus)) {
                $isCompleted = ($filterStatus == "completed") ? 1 : 0;
                $query = $query->where('completed', $isCompleted);
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

    public function create(Request $data): array
    {
        $funcName = $this->className . ".create";

        $validator = Validator::make($data->all(), [
            'title' => 'required',
        ]);
        $customAttributes = [
            'title' => 'Judul Tugas',
        ];
        $validator->setAttributeNames($customAttributes);
        $validator->validate();

        DB::beginTransaction();
        try {
            DB::table("tasks")
                ->insertGetId([
                    'title'         => $data['title'],
                    'description'   => $data['description'],
                    'completed'     => 0,
                    // 'created_by'    => Auth::user()->id,
                    'created_at'    => datetime_now()
                ]);

            DB::commit();

            return Response::buildSuccessCreated();
        } catch (\Exception $e) {
            DB::rollback();

            Log::error($e->getMessage(), [
                "func_name" => $funcName,
                'user' => Auth::user()
            ]);
            return Response::buildErrorService($e->getMessage());
        }
    }
    public function update(Request $data, int $id): array
    {
        $return = [];
        $funcName = $this->className . ".update";

        $validator = Validator::make($data->all(), [
            'title' => 'required',
        ]);
        $customAttributes = [
            'title' => 'Judul Tugas',
        ];
        $validator->setAttributeNames($customAttributes);
        $validator->validate();

        $update = [
            'title'         => $data['title'],
            'description'   => $data['description'],
            'completed'     => $data['completed'],
            // 'updated_by' => Auth::user()->id,
            'updated_at'    => datetime_now()
        ];

        DB::beginTransaction();

        try {
            DB::table("tasks")
                ->where("id", $id)
                ->update($update);

            DB::commit();
            $return = Response::buildSuccess(
                message: ResponseEntity::SUCCESS_MESSAGE_UPDATED
            );
        } catch (\Exception $e) {
            DB::rollback();

            Log::error($e->getMessage(), [
                "func_name" => $funcName,
                'user' => Auth::user()
            ]);
            return Response::buildErrorService($e->getMessage());
        }

        return $return;
    }

    public function softDelete(int $id): array
    {
        $return = [];
        $funcName = $this->className . ".delete";

        DB::beginTransaction();

        try {
            $delete = DB::table("tasks")
                ->where('id', $id)
                ->update([
                    // 'deleted_by' => Auth::user()->id,
                    'deleted_at' => datetime_now(),
                ]);

            if (!$delete) {
                DB::rollback();

                throw new Exception("FAILED DELETE DATA");
            }

            DB::commit();

            $return = Response::buildSuccess();
        } catch (\Exception $e) {
            DB::rollback();
            Log::error($e->getMessage(), [
                "func_name" => $funcName,
                'user' => Auth::user()
            ]);

            return Response::buildErrorService($e->getMessage());
        }

        return $return;
    }
}
