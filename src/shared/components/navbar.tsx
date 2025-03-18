import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  NavbarContent,
  NavbarItem,
} from "@heroui/navbar";
import React from "react";
import Image from "next/image";

import { ThemeSwitch } from "./theme-switch";
import { Avatar } from "./avatar";

type NavbarProps = {
  session: any;
  activePage: string;
};

export default function Navbar({ session, activePage }: NavbarProps) {
  const menuItems = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Comunidades",
      href: "/comunidades",
    },
  ];

  return (
    <HeroUINavbar maxWidth="xl">
      <NavbarContent>
        <NavbarMenuToggle className="sm:hidden" />
        <NavbarBrand className="gap-1">
          <Image alt="dev.gather" height={18} src="/logo.png" width={18} />
          <p className="font-bold text-inherit">
            Dev<span className="text-primary">.Gather</span>
          </p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive={activePage === "home"}>
          <Link
            color={activePage === "home" ? "primary" : "foreground"}
            href="/"
          >
            Home
          </Link>
        </NavbarItem>
        <NavbarItem isActive={activePage === "comunidades"}>
          <Link
            aria-current="page"
            color={activePage === "comunidades" ? "primary" : "foreground"}
            href="/comunidades"
          >
            Comunidades
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <ThemeSwitch />
        <NavbarItem className="gap-2 flex">
          {session ? (
            <Avatar user={session.user} />
          ) : (
            <>
              <Button as={Link} color="primary" href="/sign-in" variant="flat">
                Sign In
              </Button>
            </>
          )}
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.name}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                    ? "danger"
                    : "foreground"
              }
              href={item.href}
              size="lg"
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </HeroUINavbar>
  );
}
