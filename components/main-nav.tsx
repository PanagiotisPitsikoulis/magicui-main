"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import posthog from "posthog-js";

import { docsConfig } from "@/config/docs";
import { cn } from "@/lib/utils";
import { NavbarBrand, NavbarContent } from "@nextui-org/react";
import { Icons } from "@/components/icons";

export function MainNav() {
  const pathname = usePathname();

  return (
    <>
      <NavbarBrand>
        <Link href='/' className='flex items-center space-x-2'>
          <Icons.logo className='h-8 w-8' />
          <span className='font-bold text-lg'>LandCN</span>
        </Link>
      </NavbarBrand>
      <NavbarContent className='hidden sm:flex gap-4' justify='end'>
        {docsConfig.mainNav.map((item) => (
          <Link
            key={item.href}
            href={item.href!}
            aria-label={item.title}
            onClick={() => item.event && posthog.capture(item.event)}
            target={item.external ? "_blank" : undefined}
            rel={item.external ? "noopener noreferrer" : undefined}
            className={cn(
              "flex items-center justify-center transition-colors hover:text-foreground/80",
              pathname?.startsWith(item.href!)
                ? "text-foreground"
                : "text-foreground/60"
            )}
          >
            <span className='shrink-0'>{item.title}</span>
            {item.label && (
              <span className='ml-2 rounded-md bg-[#FFBD7A] px-1.5 py-0.5 text-xs leading-none text-[#000000] no-underline group-hover:no-underline'>
                {item.label}
              </span>
            )}
            {item.external && <ExternalLinkIcon className='ml-2 size-4' />}
          </Link>
        ))}
      </NavbarContent>
    </>
  );
}
