import React from "react";
import { Link, useForm } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { Textarea } from "@/Components/ui/textarea";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { Checkbox } from "@/Components/ui/checkbox";
import AppLayout from "@/Layouts/AppLayout";
import { toast } from "@/hooks/use-toast";
import { CustomButton } from "@/Components/Custom/Button";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/Components/ui/card";

interface Task {
    id: number;
    title: string;
    description: string;
    completed: boolean;
}

export default function Edit({ task }: { task: Task }) {
    const { data, setData, put, processing, errors } = useForm({
        title: task.title,
        description: task.description,
        completed: task.completed,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/tasks/${task.id}`);
    };

    return (
        <AppLayout>
            <div className="pb-2 mb-4 flex flex-col md:flex-row justify-center md:justify-between items-center">
                <div className="header mb-4 md:mb-0 text-center md:text-left flex items-center">
                    <Link href="/tasks" className="me-3">
                        <CustomButton variant="warningDefault" className="text-sm shadow-md w-full h-full">
                            <ArrowLeft />
                        </CustomButton>
                    </Link>
                    <div>
                        <p className="text-sm font-light text-slate-500">
                            TodoList Task
                        </p>
                        <h2 className="text-2xl font-extrabold">
                            Edit Data
                        </h2>
                    </div>
                </div>
            </div>


            <div className="flex flex-wrap -mx-2">
                <div className="w-full md:w-1/2 px-1">
                    <Card className="border-none rounded-2xl shadow-sm">
                        <CardContent>

                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <Label htmlFor="title" className="mb-2 block">Title</Label>
                                    <Input
                                        id="title"
                                        type="text"
                                        value={data.title}
                                        onChange={(e) =>
                                            setData("title", e.target.value)
                                        }
                                    />
                                    {errors.title && (
                                        <div className="text-red-500">
                                            {errors.title}
                                        </div>
                                    )}
                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="title" className="mb-2 block">Description</Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) =>
                                            setData("description", e.target.value)
                                        }
                                    />
                                    {errors.description && (
                                        <div className="text-red-500">
                                            {errors.description}
                                        </div>
                                    )}
                                </div>
                                <div className="mb-4">
                                    <Label
                                        htmlFor="completed"
                                        className="flex items-center "
                                    >
                                        <Checkbox
                                            id="completed"
                                            checked={data.completed}
                                            onCheckedChange={(checked) =>
                                                setData(
                                                    "completed",
                                                    checked as boolean
                                                )
                                            }
                                        />
                                        <span className="ml-2">Completed</span>
                                    </Label>
                                </div>
                                <div className="flex justify-end ">
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="rounded-xl h-[50px] w-[150px]"
                                    >
                                        Update Task
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>

        </AppLayout>
    );
}
