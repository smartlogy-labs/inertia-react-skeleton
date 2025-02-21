import {
    LayoutDashboard,
    CheckSquare,
    Package,
    MessageCircle,
    Users,
    Bug,
    ShieldAlert,
    UserX,
    AlertTriangle,
    ServerCrash,
    ShieldBan,
    Settings,
    UserCog,
    Wrench,
    Paintbrush,
    Bell,
    MonitorCheck,
    HelpCircle,
} from 'lucide-react';
import { AudioWaveform, Command, GalleryVerticalEnd } from 'lucide-react';
import { SidebarData } from './sidebar-type';

export const sidebarData: SidebarData = {
    user: {
        name: 'satnaing',
        email: 'satnaingdev@gmail.com',
        avatar: '/avatars/shadcn.jpg',
    },
    teams: [
        {
            name: 'Shadcn Admin',
            logo: Command,
            plan: 'Vite + ShadcnUI',
        },
        {
            name: 'Acme Inc',
            logo: GalleryVerticalEnd,
            plan: 'Enterprise',
        },
        {
            name: 'Acme Corp.',
            logo: AudioWaveform,
            plan: 'Startup',
        },
    ],
    navGroups: [
        {
            title: 'MENU APLIKASI',
            items: [
                {
                    title: 'Dashboard',
                    url: '/dashboard',
                    icon: LayoutDashboard,
                }, 
                {
                    title: 'Tasks',
                    url: '/tasks',
                    icon: Users,
                },
                {
                    title: 'Data Master',
                    icon: CheckSquare,
                    items: [
                        {
                            title: 'Task Category',
                            url: '/task-category',
                        },
                    ],
                },
            ],
        },
        // {
        //     title: 'Pages',
        //     items: [ 
        //         {
        //             title: 'Errors',
        //             icon: Bug,
        //             items: [
        //                 {
        //                     title: 'Unauthorized',
        //                     url: '/401',
        //                     icon: ShieldAlert,
        //                 }, 
        //             ],
        //         },
        //     ],
        // },
    ],
};
