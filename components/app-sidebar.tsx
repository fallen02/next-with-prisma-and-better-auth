"use client";

import * as React from "react";
import {
  // BookOpen,
  // Bot,
  User2,
  // Settings2,
  SquareTerminal,
  LogOutIcon,
  File
  
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
// import { NavProjects } from "@/components/nav-projects";
// import { NavUser } from "@/components/nav-user";
// import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Button } from "./ui/button";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: SquareTerminal,
      

    },
    {
      title: "Files",
      url: "#",
      icon: File,
      
      items: [
        {
          title: "Add New",
          url: "/dashboard/files/add-new",
        },
        {
          title: "Add Existing",
          url: "/dashboard/files/add-existing",
        },
        {
          title: "Manage",
          url: "/dashboard/files/manage",
        },
      ],
    },
    {
      title: "Users",
      url: "#",
      icon: User2,
      items: [
        {
          title: "Add User",
          url: "/dashboard/users/add-new",
        },
        {
          title: "Manage User",
          url: "/dashboard/users/manage",
        },
        
      ],
    },
    // {
    //   title: "Settings",
    //   url: "#",
    //   icon: Settings2,
    //   items: [
    //     {
    //       title: "General",
    //       url: "#",
    //     },
    //     {
    //       title: "Team",
    //       url: "#",
    //     },
    //     {
    //       title: "Billing",
    //       url: "#",
    //     },
    //     {
    //       title: "Limits",
    //       url: "#",
    //     },
    //   ],
    // },
  ],

};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="floating" {...props}>
      <SidebarHeader className="flex items-center justify-between p-4 ">
        <div className="bg-background/50 px-6 py-2.5 rounded-2xl">
          <div className="text-xl font-semibold">Welcome</div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <div className="px-4 py-2.5">
          <Button  className="w-full cursor-pointer" variant="outline" size="lg">
            Log Out
            <LogOutIcon className="w-6 h-6 ml-2" />
          </Button>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
