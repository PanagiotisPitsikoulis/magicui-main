"use client";

import { SidebarNavItem } from "@/types";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import posthog from "posthog-js";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { Link } from "@nextui-org/react";

export interface DocsSidebarNavProps {
  items: SidebarNavItem[];
}

export function DocsSidebarNav({ items }: DocsSidebarNavProps) {
  const pathname = usePathname();

  return items.length ? (
    <div className='w-full pb-20 pt-8'>
      {items.map((item, index) => (
        <div key={index} className={"pb-4"}>
          <h4 className='mb-1 rounded-md px-2 py-1 text-sm font-semibold'>
            {item.title}
          </h4>
          {item?.items && (
            <DocsSidebarNavItems
              items={item.items}
              pathname={pathname}
              groupId={`group-${index}`}
            />
          )}
        </div>
      ))}
    </div>
  ) : null;
}

interface DocsSidebarNavItemsProps {
  items: SidebarNavItem[];
  pathname: string | null;
  groupId: string;
}

export function DocsSidebarNavItems({
  items,
  pathname,
  groupId,
}: DocsSidebarNavItemsProps) {
  return items?.length ? (
    <div className='relative grid grid-flow-row auto-rows-max gap-0.5 text-sm'>
      {items.map((item, index) =>
        item.href && !item.disabled ? (
          <Link
            size='sm'
            as={NextLink}
            key={index}
            href={item.href}
            onPress={() => item.event && posthog.capture(item.event)}
            className={cn(
              "group relative flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:text-foreground",
              item.disabled && "cursor-not-allowed opacity-60",
              pathname === item.href
                ? "font-medium text-foreground"
                : "text-muted-foreground"
            )}
            target={item.external ? "_blank" : ""}
            rel={item.external ? "noreferrer" : ""}
          >
            {pathname === item.href && (
              <motion.div
                layoutId={groupId}
                className='absolute inset-0 bg-content2 rounded-md mr-10'
                initial={false}
                transition={{
                  type: "spring",
                  stiffness: 350,
                  damping: 30,
                  mass: 1,
                  velocity: 200,
                }}
              />
            )}
            <span className='relative z-10 shrink-0'>{item.title}</span>
            {item.label && (
              <span className='relative z-10 ml-2 rounded-md bg-[#FFBD7A] px-1.5 py-0.5 text-xs leading-none text-[#000000] no-underline group-hover:no-underline'>
                {item.label}
              </span>
            )}
            {item.paid && (
              <span className='relative z-10 ml-2 rounded-md bg-[#4ade80] px-1.5 py-0.5 text-xs leading-none text-[#000000] no-underline group-hover:no-underline'>
                Pro
              </span>
            )}
            {item.external && (
              <ExternalLinkIcon className='relative z-10 ml-2 size-4' />
            )}
          </Link>
        ) : (
          <span
            key={index}
            className={cn(
              "flex w-full cursor-not-allowed items-center rounded-md p-2 text-muted-foreground",
              item.disabled && "cursor-not-allowed opacity-60"
            )}
          >
            {item.title}
            {item.label && (
              <span className='ml-2 rounded-md bg-muted px-1.5 py-0.5 text-xs leading-none text-muted-foreground no-underline group-hover:no-underline'>
                {item.label}
              </span>
            )}
            {item.paid && (
              <span className='ml-2 rounded-md bg-[#4ade80] px-1.5 py-0.5 text-xs leading-none text-[#000000] no-underline group-hover:no-underline'>
                Pro
              </span>
            )}
          </span>
        )
      )}
    </div>
  ) : null;
}
