"use client";
import React, { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import {
  Avatar,
  Badge,
  Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Spinner,
  Switch,
} from "@nextui-org/react";
import NextLink from "next/link";
import { useTheme } from "next-themes";
import { useSelectedLayoutSegment } from "next/navigation";

const AppLogo = (
  props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height="2.5em"
    viewBox="0 0 383 112"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M60.67 88L57.06 71.185H38.535L34.83 88H26.375L42.43 21.5H53.355L69.125 88H60.67ZM47.75 27.77L40.055 64.06H55.54L47.75 27.77ZM91.925 88V21.5H100.19V80.78H121.375V88H91.925ZM169.65 88L158.82 62.54L147.42 88H138.49L154.64 53.61L139.915 21.5H148.94L158.915 44.395L169.175 21.5H178.01L163 53.515L178.96 88H169.65ZM237.489 72.99C237.489 78.4367 236.222 82.3 233.689 84.58C231.219 86.86 227.102 88 221.339 88H202.719V21.5H220.199C225.899 21.5 230.205 22.6717 233.119 25.015C236.032 27.295 237.489 31.0633 237.489 36.32V72.99ZM229.224 35.465C229.224 33.375 228.59 31.7283 227.324 30.525C226.057 29.2583 224.379 28.625 222.289 28.625H210.984V80.875H222.194C224.6 80.875 226.374 80.3367 227.514 79.26C228.654 78.12 229.224 76.3467 229.224 73.94V35.465ZM265.074 88V21.5H296.234V28.435H273.339V50.19H293.859V57.125H273.339V81.065H296.234V88H265.074ZM341.896 88H330.591L317.576 21.5H325.936L336.386 79.64L347.691 21.5H355.861L341.896 88Z"
      fill="white"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M43.1705 5L43.1955 0H5H0V5V103V108H5H378H383V103V5V0H378H135.348L135.323 5H378V103H5V5H43.1705Z"
      fill="white"
    />
  </svg>
);

const SunIcon = (
  props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    {...props}
  >
    <g fill="currentColor">
      <path d="M19 12a7 7 0 11-7-7 7 7 0 017 7z" />
      <path d="M12 22.96a.969.969 0 01-1-.96v-.08a1 1 0 012 0 1.038 1.038 0 01-1 1.04zm7.14-2.82a1.024 1.024 0 01-.71-.29l-.13-.13a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.984.984 0 01-.7.29zm-14.28 0a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a1 1 0 01-.7.29zM22 13h-.08a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zM2.08 13H2a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zm16.93-7.01a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a.984.984 0 01-.7.29zm-14.02 0a1.024 1.024 0 01-.71-.29l-.13-.14a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.97.97 0 01-.7.3zM12 3.04a.969.969 0 01-1-.96V2a1 1 0 012 0 1.038 1.038 0 01-1 1.04z" />
    </g>
  </svg>
);

const MoonIcon = (
  props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    {...props}
  >
    <path
      d="M21.53 15.93c-.16-.27-.61-.69-1.73-.49a8.46 8.46 0 01-1.88.13 8.409 8.409 0 01-5.91-2.82 8.068 8.068 0 01-1.44-8.66c.44-1.01.13-1.54-.09-1.76s-.77-.55-1.83-.11a10.318 10.318 0 00-6.32 10.21 10.475 10.475 0 007.04 8.99 10 10 0 002.89.55c.16.01.32.02.48.02a10.5 10.5 0 008.47-4.27c.67-.93.49-1.519.32-1.79z"
      fill="currentColor"
    />
  </svg>
);

export default function Nav() {
  const { data: session, status } = useSession();
  const { user } = session || {};
  const segment = useSelectedLayoutSegment();
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} className="mt-2">
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <AppLogo />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-6" justify="center">
        <NavbarItem isActive={segment === "(home)"}>
          <Link
            color={segment === "(home)" ? undefined : "foreground"}
            href="/"
            as={NextLink}
          >
            Home
          </Link>
        </NavbarItem>
        <NavbarItem isActive={segment === "posts"}>
          <Link
            color={segment === "posts" ? undefined : "foreground"}
            href="/posts"
            as={NextLink}
          >
            Feed
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <Switch
          isSelected={theme === "dark"}
          onChange={(e) => setTheme(theme === "dark" ? "light" : "dark")}
          thumbIcon={({ isSelected, className }) =>
            isSelected ? (
              <MoonIcon className={className} />
            ) : (
              <SunIcon className={className} />
            )
          }
        />
        {session ? (
          <>
            {user?.image ? (
              <Avatar src={user.image as string} />
            ) : (
              <Avatar name={user?.name?.charAt(0) as string} />
            )}
            <Button variant="light" onClick={() => signOut()}>
              Sign out
            </Button>
          </>
        ) : (
          <NavbarItem>
            <Button variant="flat" onClick={() => signIn()} color="primary">
              {status && status === "loading" ? (
                <Spinner color="primary" size="sm" />
              ) : (
                "Login"
              )}
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>

      <NavbarMenu>
        <NavbarMenuItem>
          <Link
            style={{
              minWidth: "100%",
              color: "inherit",
              fontWeight: segment === "(home)" ? "bold" : "normal",
            }}
            href="/"
            as={NextLink}
          >
            Home
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link
            style={{
              minWidth: "100%",
              color: "inherit",
              fontWeight: segment === "posts" ? "bold" : "normal",
            }}
            href="/posts"
            as={NextLink}
          >
            Feed
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
