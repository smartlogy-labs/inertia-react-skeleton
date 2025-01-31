import { CheckSquare, LayoutDashboard, SquareTerminal } from "lucide-react";
import { usePage } from "@inertiajs/react";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/Components/ui/sidebar";

import { NavMain } from "@/Components/Nav-main";

const data = {
    mainMenu: [
        {
            title: "Dashboard",
            url: "/dashboard",
            icon: LayoutDashboard,
        },
        {
            title: "Tasks",
            url: "/tasks",
            icon: CheckSquare,
        },
    ],

    navMain: [
        {
            title: "Playground",
            url: "#",
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

    return (
        <Sidebar collapsible="icon" variant="floating">
            <SidebarHeader>
                <h1 className="text-xl font-semibold p-4">Smartlogy Project</h1>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {data.mainMenu.map((item) => {
                                const isActive = url.startsWith(item.url);

                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <a
                                                href={item.url}
                                                className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
                                                    isActive
                                                        ? "bg-sidebar-accent font-bold"
                                                        : "text-gray-700 hover:bg-gray-200"
                                                }`}
                                            >
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                        <SidebarGroupLabel>Platform</SidebarGroupLabel>
                        <NavMain items={data.navMain} />
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
