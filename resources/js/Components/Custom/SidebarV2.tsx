// import {
//     Sidebar,
//     SidebarContent,
//     SidebarFooter,
//     SidebarHeader,
//     SidebarRail,
// } from '@/components/ui/sidebar'
// import { NavGroup } from '@/components/layout/nav-group'
// import { NavUser } from '@/components/layout/nav-user'
// import { TeamSwitcher } from '@/components/layout/team-switcher'
import { NavUser } from '../nav-user'
import { NavGroup } from '../ui/nav-group'
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '../ui/sidebar'
import { TeamSwitcher } from '../ui/team-switcher'
import { sidebarData } from './data/sidebar-data'

export function AppSidebarV2({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible='icon' variant='sidebar' {...props}>
            {/* <SidebarHeader>
                <TeamSwitcher teams={sidebarData.teams} />
            </SidebarHeader> */}

            <SidebarHeader>
                <h1 className="text-lg font-semibold p-4">Smartlogy Project</h1>
            </SidebarHeader>
            <SidebarContent>
                {sidebarData.navGroups.map((props) => (
                    <NavGroup key={props.title} {...props} />
                ))}
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={sidebarData.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}