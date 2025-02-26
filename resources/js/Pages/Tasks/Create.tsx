import React from "react";
import { Link, useForm } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import { Label } from "@/Components/ui/label";
import AppLayout from "@/Layouts/AppLayout";
import { CustomButton } from "@/Components/Custom/Button";
import { Card, CardContent } from "@/Components/ui/card";
import { ArrowLeft } from "lucide-react";

interface CreateProps {
    csrf_token: string;
}

export default function Create({ csrf_token }: CreateProps) {
    const { data, setData, post, processing, errors } = useForm({
        title: "",
        description: "",
        _token: csrf_token, // Menyertakan CSRF token dalam data form
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post("/tasks");
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
                            Tambah Data
                        </h2>
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap -mx-2">
                <div className="w-full md:w-1/2 px-1">
                    <Card className="border-none rounded-2xl shadow-sm">
                        <CardContent>
                            <form onSubmit={handleSubmit} className="p-4 md:p-0">
                                <input type="hidden" name="_token" value={csrf_token} /> {/* Menyertakan CSRF token sebagai input tersembunyi */}
                                <div className="mb-4">
                                    <Label htmlFor="title" className="mb-2 block">Title</Label>
                                    <Input
                                        id="title"
                                        type="text"
                                        placeholder="Judul tugas"
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
                                    <Label htmlFor="description" className="mb-2 block">Description</Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        placeholder="Deskripsi tugas"
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
                                <div className="flex justify-end">
                                    <CustomButton
                                        variant="default"
                                        type="submit"
                                        disabled={processing}
                                        className="font-extrabold"
                                    >
                                        Simpan Data
                                    </CustomButton>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}