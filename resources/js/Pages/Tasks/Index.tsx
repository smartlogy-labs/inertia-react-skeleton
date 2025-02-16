import React, { useState } from "react";
import { Deferred, Link, router, usePage } from "@inertiajs/react";
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
import { Edit, Trash } from "lucide-react";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/Components/ui/pagination";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card";
import { PaginationResponse } from "@/types/response";
import { TaskList } from "./Types/task";
import PaginationV2 from "@/Components/AutoPagination";
import CustomPagination from "@/Components/AutoPagination";
import TaskTable from "./TaskTable";
import { CustomButton } from "@/Components/Custom/Button";


interface TasksResponse {
    data: TaskList[];
    links: PaginationResponse["links"];
    current_page: number;
    last_page: number;
    next_page_url: string | null;
    prev_page_url: string | null;
}

export default function Index({
    tasks,
    filters,
}: {
    tasks: TasksResponse;
    filters: {
        search?: string;
        status?: string
    };
}) {
    const [search, setSearch] = useState(filters.search || "");
    const [status, setStatus] = useState(filters.status || "");

    const handleSearch = () => {
        router.get("/tasks", { search, status }, { preserveState: true, only: ['tasks'] });
    };

    const resetFilters = () => {
        setSearch("");
        setStatus("");
        router.get("/tasks", {}, { preserveState: true, only: ['tasks'] });
    };
    return (
        <AppLayout>
            <>
                <div className="pb-2 mb-4 flex flex-col md:flex-row justify-center md:justify-between items-center">
                    <div className="header mb-4 md:mb-0 text-center md:text-left">
                        <h2 className="text-2xl font-extrabold font-nunito">
                            TodoList Task
                        </h2>
                    </div>
                    <Link href="tasks/create">
                        <CustomButton variant="default" size="default">Create Task + </CustomButton>
                    </Link>
                </div>

                <Card>
                    <CardHeader className="p-3">
                        <Card className="mb-3">
                            <CardContent className="p-3">
                                <div className="flex flex-col gap-4 mb-4 md:flex-col lg:flex-row">
                                    <Input
                                        type="text"
                                        placeholder="Kata Kunci Nama"
                                        className="h-auto rounded-xl w-full lg:w-auto"
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                    />
                                    <Select
                                        value={status}
                                        onValueChange={setStatus}
                                    >
                                        <SelectTrigger className="w-full h-auto rounded-xl lg:w-auto">
                                            <SelectValue placeholder="Filter" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="all">
                                                    Semua Status
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

                                <CustomButton
                                    size="sm"
                                    variant="default"
                                    onClick={handleSearch}
                                    className="me-1"
                                >
                                    Search
                                </CustomButton>

                                <CustomButton
                                    size="sm"
                                    variant="warningOutline"
                                    onClick={resetFilters}
                                    className="me-2"
                                >
                                    Reset
                                </CustomButton>
                            </CardContent>
                        </Card>
                    </CardHeader>

                    <Deferred data="tasks" fallback={<div>Loading...</div>}>
                        <TaskTable />
                    </Deferred>
                </Card>
            </>
        </AppLayout>
    );
}
