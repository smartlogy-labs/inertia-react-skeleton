<?php

namespace App\Http\Modules\Tasks\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Modules\Tasks\Usecases\TaskUsecase;
use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskController extends Controller
{
    protected $usecase;
    public function __construct(TaskUsecase $usecase)
    {
        $this->usecase = $usecase;
    } 

    public function index(Request $request)
    {
        $data = $this->usecase->getAll($request->input());
        $data = $data['data']['list'] ?? [];

        return Inertia::render('Tasks/Index', [
            'tasks'   => Inertia::defer(fn () => $data),
            'filters' => $request->input(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Tasks/Create');
    }

    public function doCreate(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        Task::create($validated);

        return redirect(url('/tasks'))->with([
            'message' => 'Task berhasil dibuat!',
            'type' => 'success'
        ]);
    }

    public function edit(Task $task)
    {
        return Inertia::render('Tasks/Edit', ['task' => $task]);
    }

    public function doUpdate(Request $request, Task $task)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'completed' => 'boolean',
        ]);

        $task->update($validated);

        return redirect('tasks');
    }

    public function doDelete(Task $task)
    {
        $task->delete();

        return redirect('tasks');
    }
}
