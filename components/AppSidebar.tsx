"use client";

import Link from "next/link";
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
} from "@/components/ui/sidebar";
import {
  CircleDollarSign,
  Film,
  GraduationCap,
  LayoutDashboard,
} from "lucide-react";

const items = [
  {
    title: "Dashboard",
    url: "#",
    icon: <LayoutDashboard />,
  },
  {
    title: "Videos",
    url: "/videos",
    icon: <Film />,
  },
  {
    title: "Créditos",
    url: "#",
    icon: <CircleDollarSign />,
  },
  {
    title: "Escuela",
    url: "#",
    icon: <GraduationCap />,
  },
];

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME;

export const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/" className="flex items-center flex-1 py-3 px-1">
          <Film size={30} />
          <h2 className="font-bold md:text-xl ml-2">{APP_NAME}</h2>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menú</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
