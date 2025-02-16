import { CheckSquare, LayoutDashboard, SquareTerminal } from "lucide-react";
import { Link, usePage } from "@inertiajs/react";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/Components/ui/sidebar";

import { NavMain } from "@/Components/Nav-main";
import { NavUser } from "./nav-user";

const data = {
    mainMenu: [
        {
            title: "Dashboard",
            route: "dashboard",
            icon: LayoutDashboard,
        },
        {
            title: "Tasks",
            route: "/tasks",
            icon: CheckSquare,
        },
        {
            title: "Task Categories",
            route: "/task-category",
            icon: CheckSquare,
        },
    ],

    navMain: [
        {
            title: "Playground",
            url: "/",
            icon: SquareTerminal,
            items: [
                {
                    title: "History",
                    url: "#",
                },
                {
                    title: "Starred",
                    url: "#",
                },
                {
                    title: "Settings",
                    url: "#",
                },
            ],
        },
    ],
};

export function AppSidebar() {
    const { url } = usePage();
    const user = usePage().props.auth.user;

    return (
        <Sidebar collapsible="icon" variant="sidebar">
            <SidebarHeader>
                <h1 className="text-xl font-semibold p-4">Smartlogy Project</h1>
            </SidebarHeader>
            <SidebarContent >
                <SidebarGroup>
                    <SidebarGroupLabel>MAIN MENU</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {data.mainMenu.map((item) => {
                                const itemPath = new URL(
                                    item.route, // Langsung pakai item.route tanpa route()
                                    window.location.origin
                                ).pathname;
                                const isActive =
                                    url === itemPath || url.startsWith(itemPath);

                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <Link
                                                href={item.route} // Langsung pakai item.route
                                                className={`flex items-center space-x-2 px-4 py-2 rounded-md ${isActive
                                                    ? "bg-sidebar-accent font-bold"
                                                    : "text-gray-700 hover:bg-gray-200"
                                                    }`}
                                                prefetch
                                            >
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>

                        <SidebarGroupLabel>MAIN MENU</SidebarGroupLabel>
                        <NavMain items={data.navMain} />
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <NavUser
                    user={{
                        name: user.name,
                        email: user.email || "",
                    }}
                />
            </SidebarFooter>
        </Sidebar>
    );
}
