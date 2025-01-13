"use client";
import React from "react";
import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Analytics } from "@/components/analytics";
import { PHProvider } from "@/components/posthog-provider";
import { ThemeProvider } from "@/components/theme-provider";

/**
 * The root provider for the application.
 * It wraps the NextUIProvider and ThemeProvider components.
 * It also includes the Toaster component for displaying toast messages.
 * @param children - The children of the provider.
 * @returns JSX.Element
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NextUIProvider>
        <div
          className={
            "dark:border-content2 border-content4 text-foreground bg-background"
          }
        >
          <PHProvider>
            <ThemeProvider attribute='class' defaultTheme='light'>
              <TooltipProvider>
                {children}
                <Toaster />
                <Analytics />
              </TooltipProvider>
            </ThemeProvider>
          </PHProvider>
        </div>
      </NextUIProvider>
    </>
  );
}
