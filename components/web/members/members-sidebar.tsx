"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
} from "@/components/ui/sidebar";

import WithoutPhoto from "@/public/without-photo.png";
import MembersSidebarForm from "./members-sidebar-form";
import Link from "next/link";
import { SignOutButton } from "@clerk/nextjs";

type Item = {
  title: string;
  href: string;
  icon: React.ReactNode;
};

export default function MembersSidebar() {
  const items: Item[] = [
    {
      title: "Go to user settings",
      href: "/user/profile/settings",
      icon: <i className="icon-user" />,
    },
    {
      title: "Settings",
      href: "/members/settings",
      icon: <i className="icon-settings" />,
    },
    {
      title: "Notifications",
      href: "/members/notifications",
      icon: <i className="icon-bell" />,
    },
  ];

  return (
    <Sidebar className="border-r border-zinc-600!">
      <SidebarContent className="bg-zinc-400! gap-y-0.25!">
        <SidebarGroup className="bg-zinc-700!">
          <SidebarGroupContent className="flex flex-col gap-y-4">
            <img
              src={WithoutPhoto.src}
              alt="user photo"
              className="size-16 rounded-full"
            />
            <MembersSidebarForm />
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup className="bg-zinc-700! flex-1">
          <SidebarGroupContent className="flex flex-col gap-y-4 text-white">
            {items.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="flex items-center gap-x-2 p-2 rounded-lg hover:bg-zinc-600 transition-colors duration-200"
              >
                {item.icon}
                <span className="text-sm">{item.title}</span>
              </Link>
            ))}
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup className="bg-zinc-700!">
          <SidebarGroupContent className="flex flex-col gap-y-4 text-white">
            <div className="flex items-center gap-x-2 p-2 rounded-lg hover:bg-zinc-600 transition-colors duration-200">
              <SignOutButton />
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
