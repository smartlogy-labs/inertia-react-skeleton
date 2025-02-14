<?php

namespace App\Http\Controllers;

use App\Models\TaskCategories;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskCategoriesController extends Controller
{
    public function index(Request $request)
    {
        $query = TaskCategories::query();

        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%');
            });
        }

        $categories = $query->paginate(5);

        return Inertia::render('TaskCategory/Index', [
            'categories' => $categories,
            'filters' => $request->only(['search']),
        ]);
    }

    public function create()
    {
        return Inertia::render('TaskCategory/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        TaskCategories::create($validated);

        return Inertia::location(route('task-category.index'));
    }

    public function edit(TaskCategories $task_category)
    {
        return Inertia::render('TaskCategory/Edit', ['category' => $task_category]);
    }

    public function update(Request $request, TaskCategories $task_category)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $task_category->update($validated);

        return Inertia::location(route('task-category.index'));
    }

    public function destroy(TaskCategories $task_category)
    {
        $task_category->delete();

        return Inertia::location(route('task-category.index'));
    }
}
