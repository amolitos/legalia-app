"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  BellIcon,
  CreditCardIcon,
  LogOutIcon,
  UserCircleIcon,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export const AppBar = () => {
  const { data: session } = useSession();

  return (
    <div className="flex items-center gap-5 p-4">
      <Image
        src="/logo.svg"
        alt="Logo"
        width={175}
        height={175}
        priority
      ></Image>
      <Link
        href="/plans"
        className="bg-red-600 font-medium text-white rounded-4xl ml-auto py-1 px-3"
      >
        Obtén Plus
      </Link>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="h-10 w-10 rounded-full ring-2 ring-blue-600">
            <AvatarImage
              src={session?.user?.image ?? undefined}
              alt="{session?.user?.name}"
            />
            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
          align="end"
          sideOffset={4}
        >
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <UserCircleIcon />
              Cuenta
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CreditCardIcon />
              Facturación
            </DropdownMenuItem>
            <DropdownMenuItem>
              <BellIcon />
              Notificaciones
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>
            <LogOutIcon />
            Salir
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
