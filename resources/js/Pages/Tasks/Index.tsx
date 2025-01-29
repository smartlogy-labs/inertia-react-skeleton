import React, { useState } from "react";
import { Link, router } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Edit, Trash } from "lucide-react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";

interface Task {
    id: number;
    title: string;
    description: string;
    completed: boolean;
}

export default function Index({
    tasks,
    filters,
}: {
    tasks: Task[];
    filters: { search?: string; status?: string };
}) {
    const [search, setSearch] = useState(filters.search || "");
    const [status, setStatus] = useState(filters.status || "");

    const handleSearch = () => {
        router.get("/tasks", { search, status }, { preserveState: true });
    };

    const resetFilters = () => {
        setSearch("");
        setStatus("");
        router.get("/tasks", {}, { preserveState: true });
    };

    const deleteTask = (id: number) => {
        if (confirm("Are you sure?")) {
            router.delete(`/tasks/${id}`);
            toast({
                title: "Delete Task Successfully",
                variant: "destructive",
            });
        }
    };

    return (
        <AppLayout>
            <>
                <div className="p-2 m-2 flex flex-col md:flex-row justify-center md:justify-between items-center">
                    <div className="header mb-4 md:mb-0 text-center md:text-left">
                        <h2 className="text-2xl font-semibold">
                            TodoList Task
                        </h2>
                        <h2 className="text-1xl font-normal text-gray-600">
                            Menampilkan list tugas anda
                        </h2>
                    </div>
                    <Link href="/tasks/create">
                        <Button className="p-6">Create Task + </Button>
                    </Link>
                </div>
                <div className="border border-gray-200 bg-white overflow-hidden shadow-sm sm:rounded-xl">
                    <div className="py-4">
                        <div className="flex justify-between items-center mb-8 mx-4 border border-primary shadow-md rounded-xl">
                            <div className="space-x-2 m-4">
                                <h1 className="text-gray-500 m-4">
                                    Pencarian Data
                                </h1>
                                <div className="flex flex-col gap-4 mb-4 md:flex-col lg:flex-row">
                                    <Input
                                        type="text"
                                        placeholder="Mulai Pencarian..."
                                        className="h-[50px] rounded-xl w-full lg:w-[350px]"
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                    />
                                    <Select
                                        value={status}
                                        onValueChange={setStatus}
                                    >
                                        <SelectTrigger className="w-full h-[50px] rounded-xl lg:w-[300px]">
                                            <SelectValue placeholder="Filter" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="all">
                                                    Semua
                                                </SelectItem>
                                                <SelectItem value="pending">
                                                    Pending
                                                </SelectItem>
                                                <SelectItem value="completed">
                                                    Completed
                                                </SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <Button
                                    className="rounded-xl h-[45px] w-[150px] mb-4"
                                    type="button"
                                    onClick={handleSearch}
                                >
                                    Search
                                </Button>
                                <Button
                                    variant="destructive_outlined"
                                    className="rounded-xl h-[45px] w-[150px]"
                                    type="button"
                                    onClick={resetFilters}
                                >
                                    Reset
                                </Button>
                            </div>
                        </div>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="p-6">#</TableHead>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {tasks.length > 0 ? (
                                    tasks.map((task, index) => (
                                        <TableRow key={task.id}>
                                            <TableCell className="p-6">
                                                {index + 1}
                                            </TableCell>
                                            <TableCell>{task.title}</TableCell>
                                            <TableCell>
                                                {task.description}
                                            </TableCell>
                                            <TableCell>
                                                {task.completed
                                                    ? "Completed ✅"
                                                    : "Pending ❌"}
                                            </TableCell>
                                            <TableCell>
                                                <Link
                                                    href={`/tasks/${task.id}/edit`}
                                                >
                                                    <Button
                                                        variant="outline"
                                                        className="mr-2 mb-2"
                                                    >
                                                        <Edit />
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="destructive"
                                                    onClick={() =>
                                                        deleteTask(task.id)
                                                    }
                                                >
                                                    <Trash />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={5}
                                            className="text-2xl text-center p-6 text-gray-500"
                                        >
                                            Data tidak ditemukan 😢
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </>
        </AppLayout>
    );
}
