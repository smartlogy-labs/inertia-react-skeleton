<?php

namespace App\Http\Modules\Tasks\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Modules\Tasks\Usecases\TaskUsecase;
use App\Models\Task;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
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
            'tasks'   => Inertia::defer(fn () => $data),
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
        $process = $this->usecase->create(
            data: $request,
        );

        if (empty($process['error'])) {
            return redirect(url('/tasks'))->with([
                'message' => 'Task berhasil dibuat!',
                'type' => 'success'
            ]);
        } else {
            return redirect(url('/tasks'))->with([
                'message' => 'Task gagal dibuat!',
                'type' => 'error'
            ]);
        }
    }

    public function edit(Task $task) : Response
    {
        return Inertia::render('Tasks/Edit', ['task' => $task]);
    }

    public function doUpdate(Request $request, int $id) : RedirectResponse
    {
        $process = $this->usecase->update(
            data: $request,
            id: $id,
        );

        if (empty($process['error'])) {
            return redirect(url('/tasks'))->with([
                'message' => 'Task berhasil diperbarui!',
                'type' => 'success'
            ]);
        } else {
            return redirect(url('/tasks'))->with([
                'message' => 'Task gagal diperbarui!',
                'type' => 'error'
            ]);
        }
    }

    public function doDelete(int $id) : RedirectResponse
    {
        $process = $this->usecase->softDelete(
            id: $id,
        );

        if (empty($process['error'])) {
            return redirect(url('/tasks'))->with([
                'message' => 'Task berhasil dihapus!',
                'type' => 'success'
            ]);
        } else {
            return redirect(url('/tasks'))->with([
                'message' => 'Task gagal dihapus!',
                'type' => 'error'
            ]);
        }
    }
}
