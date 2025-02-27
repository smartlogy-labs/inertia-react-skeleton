<?php

namespace App\Http\Modules\Tasks\Usecases;

use App\Entities\DatabaseEntity;
use App\Entities\ResponseEntity;
use App\Http\Presenter\Response;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;

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
            $query = DB::table('tasks')->whereNull('deleted_at');
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

    public function getByID(int $id): array
    {
        $funcName = $this->className . ".getByID";

        try {
            $data = DB::table(DatabaseEntity::TASK, "t")
                ->leftJoin("task_categories as tc", "tc.id", "=", "t.category_id")
                ->whereNull("t.deleted_at")
                ->where('t.id', $id)
                ->first(['t.*', 'tc.name as category']);

            return Response::buildSuccess(
                data: collect($data)->toArray()
            );
        } catch (\Exception $e) {
            Log::error($e->getMessage(), [
                "func_name" => $funcName,
                'user' => Auth::user()
            ]);

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
            'title' => 'Judul',
        ];
        $validator->setAttributeNames($customAttributes);
        $validator->validate();

        DB::beginTransaction();
        try {
            $taskID = DB::table(DatabaseEntity::TASK)
                ->insertGetId([
                    'title'                 => $data['title'],
                    'category_id'           => $data['category_id'],
                    'description'           => $data['description'],
                    'created_by'            => Auth::user()->id,
                    'created_at'            => now()
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
            'title' => 'Judul',
        ];
        $validator->setAttributeNames($customAttributes);
        $validator->validate();

        $update = [
            'title'                 => $data['title'],
            'category_id'           => $data['category_id'],
            'description'           => $data['description'],
            'updated_by'            => Auth::user()->id,
            'updated_at'            => now()
        ];

        DB::beginTransaction();

        try {
            DB::table(DatabaseEntity::TASK)
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

    public function delete(int $id): array
    {
        $return = [];
        $funcName = $this->className . ".delete";

        DB::beginTransaction();

        try {
            $delete = DB::table(DatabaseEntity::TASK)
                ->where('id', $id)
                ->update([
                    'deleted_by' => Auth::user()->id,
                    'deleted_at' => now(),
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
