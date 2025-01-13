import Link from "next/link";
import { CommandMenu } from "@/components/command-menu";
import { Icons } from "@/components/icons";
import { MainNav } from "@/components/main-nav";
import { MobileNav } from "@/components/mobile-nav";
import { ModeToggle } from "@/components/mode-toggle";
import { siteConfig } from "@/config/site";
import { Button, Navbar, NavbarContent, NavbarItem } from "@nextui-org/react";

export async function SiteHeader() {
  return (
    <Navbar isBlurred shouldHideOnScroll shouldBlockScroll>
      <MainNav />
      <MobileNav />
      <NavbarContent justify='end'>
        <NavbarItem className='w-full flex-1 md:w-auto md:flex-none'>
          <CommandMenu />
        </NavbarItem>
        <nav className='flex items-center gap-2'>
          {[
            {
              href: siteConfig.links.github,
              icon: Icons.gitHub,
              label: "GitHub",
            },
          ].map(({ href, icon: Icon, label }) => (
            <NavbarItem key={label}>
              <Button
                size='sm'
                isIconOnly
                variant='ghost'
                as={Link}
                href={href}
                target='_blank'
                rel='noreferrer'
              >
                <Icon className='size-4' />
                <span className='sr-only'>{label}</span>
              </Button>
            </NavbarItem>
          ))}
          <ModeToggle />
        </nav>
      </NavbarContent>
    </Navbar>
  );
}
