import CustomPagination from '@/Components/AutoPagination';
import { CustomButton } from '@/Components/Custom/Button';
import { Button } from '@/Components/ui/button';
import { CardContent } from '@/Components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/Components/ui/table';
import { PaginationResponse } from '@/types/response';
import { Link, router, usePage } from '@inertiajs/react';
import { Edit, Trash } from 'lucide-react';

interface Task {
    id: number;
    title: string;
    description: string;
    completed: boolean;
}

interface TasksResponse {
    data: Task[];
    links: PaginationResponse["links"];
    current_page: number;
    last_page: number;
    next_page_url: string | null;
    prev_page_url: string | null;
}

export default function TaskTable() {
    const { props } = usePage();
    const tasks = props.tasks as TasksResponse;

    const deleteTask = (id: number) => {
        if (confirm("Are you sure?")) {
            router.delete(`/tasks/${id}`, { preserveState: true, only: ['tasks'] });
        }
    };

    return (
        <CardContent>
            <Table className="mb-3">
                <TableHeader>
                    <TableRow className="fw-bolder">
                        <TableHead>Title</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tasks.data.length > 0 ? (
                        tasks.data.map((task, index) => (
                            <TableRow key={task.id}>
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
                                    <Link className='me-1'
                                        href={`/tasks/${task.id}/edit`}
                                    >
                                        <CustomButton
                                            size='sm'
                                            variant="warningOutline"
                                        >
                                            <Edit />
                                        </CustomButton>
                                    </Link>
                                    <CustomButton
                                        size='sm'
                                        variant="danger"
                                        onClick={() =>
                                            deleteTask(task.id)
                                        }
                                    >
                                        <Trash />
                                    </CustomButton>
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

            <CustomPagination links={tasks.links} />
        </CardContent>
    );
}
