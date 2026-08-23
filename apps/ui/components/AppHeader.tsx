"use client"

import * as React from "react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { CloudSunIcon } from "lucide-react"

export function AppHeader() {
  return (
    <SidebarMenu>
      <SidebarMenuItem className="mt-2 ml-2 flex items-center gap-2">
        <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
          <CloudSunIcon />
        </div>
        <div className="grid flex-1 text-left text-sm leading-tight">
          <p className="truncate text-2xl">StormLabs</p>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
