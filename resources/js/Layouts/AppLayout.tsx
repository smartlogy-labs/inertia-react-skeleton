import { SidebarProvider, SidebarTrigger } from "@/Components/ui/sidebar";
import { AppSidebar } from "@/Components/app-sidebar";
import { Toaster } from "@/Components/ui/toaster";
import Dropdown from "@/Components/Dropdown";
import { usePage } from "@inertiajs/react";
import { useState } from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";
import Alert from "@/Components/AlertNotifMessage";
import { AppSidebarV2 } from "@/Components/Custom/SidebarV2";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const user = usePage().props.auth.user;

    return (
        <SidebarProvider className="font-nunito"
            style={{ "--sidebar-width": "14rem" } as React.CSSProperties}
        >
            <Toaster />
            <Alert />
            {/* <AppSidebar /> */}
            <AppSidebarV2/>
            <div className="flex-1 overflow-auto">
                <header className="bg-white w-full z-40 block lg:hidden">
                    <div className="flex justify-between items-center mx-auto py-4 px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between gap-4">
                            <SidebarTrigger />
                        </div>
                        <div className="sm:ms-6 sm:flex sm:items-center">
                            <h1 className="text-xl font-semibold p-4">Smartlogy Project</h1>
                        </div>
                    </div>
                </header>
                {/* <main className="p-4 mt-20 md:mt-0">{children}</main> */}
                <main className="lg:p-6 p-3 lg:mt-5 lg:mb-5 lg:me-2 sm:m-0 bg-slate-100 rounded-3xl shadow-md min-h-screen font-nunito">
                    {children}
                </main>

                {/* <Toaster /> */}

            </div>
        </SidebarProvider>
    );
}
