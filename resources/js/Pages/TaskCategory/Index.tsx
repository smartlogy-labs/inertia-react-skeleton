import React, { useState } from "react";
import { Link, router, useForm } from "@inertiajs/react";
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
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/Components/ui/pagination";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import { Label } from "@/Components/ui/label";
import CreateCategoryDialog from "./Components/CreateCategoryDialog";
import EditCategoryDialog from "./Components/EditCategoryDialog";

interface Category {
    id: number;
    name: string;
}

interface Pagination {
    current_page: number;
    last_page: number;
    next_page_url: string | null;
    prev_page_url: string | null;
    links: { url: string | null; label: string; active: boolean }[];
}

interface CategoriesResponse {
    data: Category[];
    links: Pagination["links"];
    current_page: number;
    last_page: number;
    next_page_url: string | null;
    prev_page_url: string | null;
}

export default function Index({
    categories,
    filters,
}: {
    categories: CategoriesResponse;
    filters: { search?: string };
}) {
    const [search, setSearch] = useState(filters.search || "");

    const handleSearch = () => {
        router.get("/task-category", { search }, { preserveState: true });
    };

    const resetFilters = () => {
        setSearch("");
        router.get("/task-category", {}, { preserveState: true });
    };

    const deleteCategory = (id: number) => {
        if (confirm("Are you sure?")) {
            router.delete(`/task-category/${id}`);
            toast({
                title: "Delete Category Successfully",
                variant: "destructive",
            });
        }
    };

    const { data, setData, post, processing, errors } = useForm({
        name: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post("/task-category");
    };
    return (
        <AppLayout>
            <>
                <div className="p-2 m-2 flex flex-col md:flex-row justify-center md:justify-between items-center">
                    <div className="header mb-4 md:mb-0 text-center md:text-left">
                        <h2 className="text-2xl font-semibold">
                            TodoList Task Category
                        </h2>
                        <h2 className="text-1xl font-normal text-gray-600">
                            Menampilkan list kategori tugas anda
                        </h2>
                    </div>
                    <CreateCategoryDialog
                        data={data}
                        setData={setData}
                        errors={errors}
                        processing={processing}
                        onSubmit={handleSubmit}
                    />
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
                                    <TableHead className="w-[80%]">
                                        Name
                                    </TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {categories.data.length > 0 ? (
                                    categories.data.map((category, index) => (
                                        <TableRow key={category.id}>
                                            <TableCell className="p-6">
                                                {index + 1}
                                            </TableCell>
                                            <TableCell>
                                                {category.name}
                                            </TableCell>
                                            <TableCell>
                                                <EditCategoryDialog
                                                    category={category}
                                                />
                                                <Button
                                                    variant="destructive"
                                                    onClick={() =>
                                                        deleteCategory(
                                                            category.id
                                                        )
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

                        <Pagination className="flex justify-center items-center py-4">
                            <PaginationContent>
                                {/* Tombol Previous */}
                                <PaginationItem>
                                    <PaginationPrevious
                                        href={categories.prev_page_url || "#"}
                                        onClick={(e) => {
                                            if (!categories.prev_page_url) {
                                                e.preventDefault();
                                            } else {
                                                router.get(
                                                    categories.prev_page_url,
                                                    {},
                                                    { preserveState: true }
                                                );
                                            }
                                        }}
                                    />
                                </PaginationItem>

                                {/* Tautan Halaman */}
                                {categories.links.map((link, index) => (
                                    <PaginationItem key={index}>
                                        <PaginationLink
                                            href={link.url || "#"}
                                            onClick={(e) => {
                                                if (!link.url || link.active) {
                                                    e.preventDefault();
                                                } else {
                                                    router.get(
                                                        link.url,
                                                        {},
                                                        { preserveState: true }
                                                    );
                                                }
                                            }}
                                            isActive={link.active}
                                        >
                                            {link.label
                                                .replace(
                                                    "&laquo; Previous",
                                                    "«"
                                                )
                                                .replace("Next &raquo;", "»")}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}

                                {/* Tombol Next */}
                                <PaginationItem>
                                    <PaginationNext
                                        href={categories.next_page_url || "#"}
                                        onClick={(e) => {
                                            if (!categories.next_page_url) {
                                                e.preventDefault();
                                            } else {
                                                router.get(
                                                    categories.next_page_url,
                                                    {},
                                                    { preserveState: true }
                                                );
                                            }
                                        }}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                </div>
            </>
        </AppLayout>
    );
}
