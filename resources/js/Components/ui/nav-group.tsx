import { ReactNode, useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '../ui/collapsible';
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    useSidebar,
} from '../ui/sidebar';
import { Badge } from '../ui/badge';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { NavCollapsible, NavItem, NavLink, type NavGroup } from '../Custom/data/sidebar-type';

export function NavGroup({ title, items }: NavGroup) {
    const { state } = useSidebar();
    const { url } = usePage();
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    // Cek URL aktif saat pertama kali render
    useEffect(() => {
        const activeItem = items.find((item) => {
            if (item.items) {
                return item.items.some((subItem) => checkIsActive(url, subItem));
            }
            return checkIsActive(url, item);
        });

        if (activeItem) {
            setOpenDropdown(activeItem.title);
        }
    }, [url, items]);

    return (
        <SidebarGroup>
            <SidebarGroupLabel>{title}</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => {
                    const key = `${item.title}-${item.url}`;

                    if (!item.items)
                        return <SidebarMenuLink key={key} item={item} url={url} />;

                    if (state === 'collapsed')
                        return (
                            <SidebarMenuCollapsedDropdown
                                key={key}
                                item={item}
                                url={url}
                                openDropdown={openDropdown}
                                setOpenDropdown={setOpenDropdown}
                            />
                        );

                    return (
                        <SidebarMenuCollapsible
                            key={key}
                            item={item}
                            url={url}
                            openDropdown={openDropdown}
                            setOpenDropdown={setOpenDropdown}
                        />
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}

const SidebarMenuCollapsible = ({
    item,
    url,
    openDropdown,
    setOpenDropdown,
}: {
    item: NavCollapsible;
    url: string;
    openDropdown: string | null;
    setOpenDropdown: (val: string | null) => void;
}) => {
    const isOpen = openDropdown === item.title;

    // Cek apakah sub menu aktif berdasarkan URL
    const isSubMenuActive = item.items.some((subItem) => checkIsActive(url, subItem));

    // Buka collapse jika sub menu aktif
    useEffect(() => {
        if (isSubMenuActive) {
            setOpenDropdown(item.title);
        }
    }, [isSubMenuActive, item.title, setOpenDropdown]);

    return (
        <Collapsible asChild open={isOpen}>
            <SidebarMenuItem>
                <CollapsibleTrigger
                    asChild
                    onClick={() => setOpenDropdown(isOpen ? null : item.title)}
                >
                    <SidebarMenuButton tooltip={item.title} isActive={isSubMenuActive}>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                        <ChevronRight
                            className={`ml-auto transition-transform duration-200 ${isOpen ? 'rotate-90' : ''
                                }`}
                        />
                    </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <SidebarMenuSub>
                        {item.items.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton
                                    asChild
                                    isActive={checkIsActive(url, subItem)}
                                    onClick={() => setOpenDropdown(item.title)} // Tetap buka collapse saat sub menu diklik
                                >
                                    <Link href={subItem.url} prefetch>{subItem.title}</Link>
                                </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                        ))}
                    </SidebarMenuSub>
                </CollapsibleContent>
            </SidebarMenuItem>
        </Collapsible>
    );
};

const SidebarMenuCollapsedDropdown = ({
    item,
    url,
    openDropdown,
    setOpenDropdown,
}: {
    item: NavCollapsible;
    url: string;
    openDropdown: string | null;
    setOpenDropdown: (val: string | null) => void;
}) => {
    const isSubMenuActive = item.items.some((subItem) => checkIsActive(url, subItem));

    return (
        <SidebarMenuItem>
            <DropdownMenu
                open={openDropdown === item.title}
                onOpenChange={(isOpen) => setOpenDropdown(isOpen ? item.title : null)}
            >
                <DropdownMenuTrigger asChild>
                    <SidebarMenuButton tooltip={item.title} isActive={isSubMenuActive}>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200" />
                    </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="right" align="start" sideOffset={4}>
                    <DropdownMenuLabel>{item.title}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {item.items.map((sub) => (
                        <DropdownMenuItem
                            key={sub.title}
                            asChild
                            onClick={() => setOpenDropdown(item.title)} // Tetap buka dropdown saat sub menu diklik
                        >
                            <Link href={sub.url} prefetch className={checkIsActive(url, sub) ? 'bg-secondary' : ''}>
                                {sub.title}
                            </Link>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </SidebarMenuItem>
    );
};

const SidebarMenuLink = ({ item, url }: { item: NavLink; url: string }) => {
    const { setOpenMobile } = useSidebar();
    return (
        <SidebarMenuItem>
            <SidebarMenuButton
                asChild
                isActive={checkIsActive(url, item)}
                tooltip={item.title}
            >
                <Link prefetch href={item.url} onClick={() => setOpenMobile(false)}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    {item.badge && <Badge>{item.badge}</Badge>}
                </Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
    );
};

// Mengecilkan scrollbar
const styles = `
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

document.head.insertAdjacentHTML('beforeend', `<style>${styles}</style>`);
function checkIsActive(url: string, item: NavItem) {
    // Jika item.url tidak ada (misalnya, pada NavCollapsible), kembalikan false
    if (!item.url) {
        return false;
    }

    // Jika URL item adalah root, bandingkan secara langsung
    if (item.url === '/') {
        return url === item.url;
    }

    // Jika tidak, periksa apakah URL aktif dimulai dengan URL item
    return url.startsWith(item.url);
}