"use client";

import React from "react";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";
import { Button } from "@nextui-org/react";
import { MoonIcon, SunIcon } from "lucide-react";

export const ModeToggle = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof Button> & { className?: string }
>(({ className, ...props }, ref) => {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      ref={ref}
      variant='ghost'
      size='sm'
      type='button'
      isIconOnly
      className={cn("px-2", className)}
      aria-label='Toggle theme'
      onPress={() => setTheme(theme === "dark" ? "light" : "dark")}
      {...props}
    >
      <SunIcon className='size-[1.2rem] text-neutral-800 dark:hidden dark:text-neutral-200' />
      <MoonIcon className='hidden size-[1.2rem] text-neutral-800 dark:block dark:text-neutral-200' />
    </Button>
  );
});

ModeToggle.displayName = "ModeToggle";
