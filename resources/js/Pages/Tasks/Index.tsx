import { useState } from "react";
import { Deferred, Link, router } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { Input } from "@/Components/ui/input";
import { Card, CardContent, CardHeader } from "@/Components/ui/card";
import { PaginationResponse } from "@/types/response";
import { TaskList } from "./Types/task";
import TaskTable from "./TaskTable";
import { CustomButton } from "@/Components/Custom/Button";
import { Search } from "lucide-react";

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
        keywordTitle?: string;
        status?: string
    };
}) {
    const [keywordTitle, setKeywordTitle] = useState(filters.keywordTitle || "");
    const [status, setStatus] = useState(filters.status || "");
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = () => {
        setIsLoading(true);
        router.get(
            "/tasks",
            { keywordTitle, status },
            {
                preserveState: true,
                only: ['tasks'],
                onFinish: () => setIsLoading(false), // Correctly placed inside the options object
            }
        );
    };

    const resetFilters = () => {
        setKeywordTitle("");
        setStatus("");
        router.get("/tasks", {}, { preserveState: true, only: ['tasks'] });
    };

    const shouldShowResetButton = keywordTitle || status;

    return (
        <AppLayout>
            <>
                <div className="pb-2 mb-4 flex flex-col md:flex-row justify-center md:justify-between items-center">
                    <div className="header mb-4 md:mb-0 text-center md:text-left">
                        <h2 className="text-2xl font-extrabold font-nunito">
                            TodoList Task
                        </h2>
                    </div>
                    <Link href="tasks/create" prefetch>
                        <CustomButton variant="default" size="default">Create Task + </CustomButton>
                    </Link>
                </div>

                <Card>
                    <CardHeader className="p-3">
                        <Card className="mb-0">
                            <CardContent className="p-3">
                                <div className="flex flex-col gap-3 mb-4 md:flex-col lg:flex-row">
                                    <Input
                                        type="text"
                                        placeholder="Kata Kunci Nama"
                                        className="h-auto w-full lg:w-auto"
                                        value={keywordTitle}
                                        onChange={(e) =>
                                            setKeywordTitle(e.target.value)
                                        }
                                    />
                                    <Select
                                        value={status}
                                        onValueChange={setStatus}
                                    >
                                        <SelectTrigger className="w-full h-auto lg:w-auto">
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
                                <div className="flex items-center gap-2">
                                <CustomButton
                                    size="sm"
                                    variant="default"
                                    onClick={handleSearch}
                                    // className="me-1"
                                    className="flex items-center gap-1"
                                    disabled={isLoading}
                                >
                                    <Search />
                                    {isLoading ? "Searching..." : "Search"}
                                </CustomButton>

                                {shouldShowResetButton && (
                                    <CustomButton
                                        size="sm"
                                        variant="warningOutline"
                                        onClick={resetFilters}
                                    >
                                        Reset
                                    </CustomButton>
                                )}
                                </div>
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