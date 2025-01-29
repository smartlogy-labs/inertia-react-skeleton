import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import AppLayout from "@/Layouts/AppLayout";

export default function Dashboard() {
    const user = usePage().props.auth.user;

    return (
        <AppLayout>
            <div className="bg-white shadow-md p-4 rounded-xl">
                <h1 className="text-2xl mb-2">
                    Hi <span className="font-bold">{user.name},</span>
                </h1>
                <h2 className="text-gray-400">
                    Welcome to SmartInertia Project
                </h2>
            </div>
        </AppLayout>
    );
}
