<?php

namespace App\Http\Modules\Tasks\Controllers;

use App\Entities\ResponseEntity;
use App\Http\Controllers\Controller;
use App\Http\Modules\Tasks\Usecases\TaskUsecase;
use App\Models\Task;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class TaskController extends Controller
{
    protected $usecase;
    public function __construct(TaskUsecase $usecase)
    {
        $this->usecase = $usecase;
    }

    public function index(Request $request) : Response
    {
        $data = $this->usecase->getAll($request->input());
        $data = $data['data']['list'] ?? [];

        return Inertia::render('Tasks/Index', [
            'tasks'   => Inertia::defer(fn() => $data),
            'filters' => $request->input(),
        ]);
    }

    public function create() : Response
    {
        return Inertia::render('Tasks/Create', [
            'csrf_token' => csrf_token(),
        ]);
    }

    public function doCreate(Request $request) : RedirectResponse
    {
        $process = $this->usecase->create(data: $request);

        if (empty($process['error'])) {
            return Redirect::route('tasks.index')->with([
                'message' => 'Task berhasil dibuat!',
                'type' => 'success'
            ]);
        } else {
            return Redirect::back()->withErrors([
                'message' => ResponseEntity::DEFAULT_ERROR_MESSAGE
            ]);
        }
    }

    public function edit(int $id)
    {
        $data = $this->usecase->getByID($id);
        if (empty($data['data'])) {
            return redirect()
                ->back()
                ->with('error', ResponseEntity::DEFAULT_ERROR_MESSAGE);
        }
        $data = $data['data'] ?? [];
        return Inertia::render('Tasks/Edit', ['task' => $data]);
    }

    public function doUpdate(int $id, Request $request)
    {
        $process = $this->usecase->update(
            data: $request,
            id: $id,
        );

        if (empty($process['error'])) {
            return Redirect::route('tasks.index')->with([
                'message' => ResponseEntity::SUCCESS_MESSAGE_UPDATED,
                'type' => 'success'
            ]);
        } else {
            return Redirect::back()->withErrors([
                'message' => ResponseEntity::DEFAULT_ERROR_MESSAGE
            ]);
        }
    }

    public function doDelete(int $id)
    {
        $process = $this->usecase->delete(
            id: $id,
        );

        if (empty($process['error'])) {
            return Redirect::route('tasks.index')->with([
                'message' => ResponseEntity::SUCCESS_MESSAGE_DELETED,
                'type' => 'success'
            ]);
        } else {
            return Redirect::back()->withErrors([
                'message' => ResponseEntity::DEFAULT_ERROR_MESSAGE
            ]);
        }
    }
}
