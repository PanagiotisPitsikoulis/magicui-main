import { NavItem, NavItemWithChildren } from "@/types";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { Doc } from "content-collections";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { docsConfig } from "@/config/docs";
import { cn } from "@/lib/utils";
import { Button } from "@nextui-org/react";

interface DocsPagerProps {
  doc: Doc;
}

export function DocPager({ doc }: DocsPagerProps) {
  const pager = getPagerForDoc(doc);

  if (!pager) {
    return null;
  }

  return (
    <div className='flex flex-row items-center justify-between gap-4'>
      {pager?.prev?.href && (
        <Button
          variant='flat'
          startContent={<ChevronLeftIcon aria-hidden='true' />}
          size='sm'
          as={Link}
          href={pager.prev.href}
          title={pager.prev.title}
        >
          <span className='truncate'>{pager.prev.title}</span>
        </Button>
      )}
      {pager?.next?.href && (
        <Button
          variant='flat'
          startContent={<ChevronRightIcon aria-hidden='true' />}
          size='sm'
          as={Link}
          href={pager.next.href}
          title={pager.next.title}
        >
          <span className='truncate'>{pager.next.title}</span>
        </Button>
      )}
    </div>
  );
}

export function getPagerForDoc(doc: Doc) {
  const flattenedLinks = [null, ...flatten(docsConfig.sidebarNav), null];
  const activeIndex = flattenedLinks.findIndex(
    (link) => doc.slug === link?.href
  );
  const prev = activeIndex !== 0 ? flattenedLinks[activeIndex - 1] : null;
  const next =
    activeIndex !== flattenedLinks.length - 1
      ? flattenedLinks[activeIndex + 1]
      : null;
  return {
    prev,
    next,
  };
}

export function flatten(links: NavItemWithChildren[]): NavItem[] {
  return links
    .reduce<NavItem[]>((flat, link) => {
      return flat.concat(link.items?.length ? flatten(link.items) : link);
    }, [])
    .filter((link) => !link?.disabled);
}
