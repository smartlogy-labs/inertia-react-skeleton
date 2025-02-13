import React from "react";
import { Link, useForm } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { Textarea } from "@/Components/ui/textarea";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { Checkbox } from "@/Components/ui/checkbox";
import AppLayout from "@/Layouts/AppLayout";
import { toast } from "@/hooks/use-toast";

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

    const getCurrentDateTime = () => {
        const now = new Date();
        return now.toLocaleString("id-ID", {
            weekday: "long", // Nama hari (e.g., "Jumat")
            year: "numeric", // Tahun (e.g., "2023")
            month: "long", // Nama bulan (e.g., "Februari")
            day: "numeric", // Tanggal (e.g., "10")
            hour: "numeric", // Jam (e.g., "17")
            minute: "numeric", // Menit (e.g., "57")
            second: "numeric", // Detik (e.g., "30")
            hour12: false, // Format 24 jam
        });
    };
    return (
        <AppLayout>
            <div className="p-2 m-2 flex justify-between">
                <div className="header">
                    <h2 className="text-2xl font-semibold">Tambahkan Task</h2>
                    <h2 className="text-1xl font-normal text-gray-600">
                        Menampilkan list pekerjaan
                    </h2>
                </div>
                <Link href={route("tasks.index")}>
                    <Button className="p-6">← Kembali</Button>
                </Link>
            </div>
            <div className="grid lg:grid-cols-2 md:grid-cols-2 gap-4">
                <div className="lg:py-8 md:py-8 border roundedborder border-gray-200 bg-white overflow-hidden shadow-sm rounded-lg">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <Label htmlFor="title">Title</Label>
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
                                <Label htmlFor="description">Description</Label>
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
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
