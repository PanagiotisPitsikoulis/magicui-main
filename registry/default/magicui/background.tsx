"use client";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

/** Content that can be either a URL string or a React element */
type LayerContent = string | React.ReactElement<any>;

/** Configuration for responsive backgrounds at different breakpoints */
type ResponsiveBackground = {
  /** Required default background content */
  default: LayerContent;
  /** Small devices (640px and up) */
  sm?: LayerContent;
  /** Medium devices (768px and up) */
  md?: LayerContent;
  /** Large devices (1024px and up) */
  lg?: LayerContent;
  /** Extra large devices (1280px and up) */
  xl?: LayerContent;
  /** 2XL devices (1536px and up) */
  "2xl"?: LayerContent;
  /** Optional dark mode background */
  dark?: LayerContent;
};

/** Props for the BackgroundContainer component */
export type BackgroundProps = {
  children: React.ReactNode;
  background?: LayerContent | ResponsiveBackground;
  overlay?: LayerContent;
  className?: string;
  classNames?: {
    container?: string;
    background?: string;
    overlay?: string;
    content?: string;
  };
};

/**
 * Renders a layer with either a React element or an image URL
 * @param content - The content to render (React element or image URL)
 * @param className - CSS classes to apply
 * @param style - Additional CSS styles
 */
export const Layer = ({
  content,
  className,
  style,
}: {
  content: LayerContent;
  className?: string;
  style?: React.CSSProperties;
}) => {
  if (React.isValidElement(content)) {
    return React.cloneElement(
      content as React.ReactElement<{
        className?: string;
        style?: React.CSSProperties;
      }>,
      {
        className: cn(
          className,
          (content.props as { className?: string }).className,
        ),
        style: {
          ...style,
          ...(content.props as { style?: React.CSSProperties }).style,
        },
      },
    );
  }

  return (
    <div
      className={className}
      style={{
        ...style,
        backgroundImage:
          typeof content === "string" ? `url('${content}')` : undefined,
      }}
    />
  );
};

export default function Background({
  children,
  background,
  overlay,
  className,
  classNames = {},
}: BackgroundProps) {
  const { theme } = useTheme(); // Get the current theme (light/dark)
  const [resolvedTheme, setResolvedTheme] = useState(theme);

  // Wait for the theme to be resolved (in case of SSR mismatch)
  useEffect(() => {
    setResolvedTheme(theme);
  }, [theme]);

  if (!background) return <div className={className}>{children}</div>;

  /**
   * Type guard to check if the background is a responsive configuration
   * @param bg - Background content to check
   * @returns True if the background is a responsive configuration
   */
  const isResponsiveBackground = (
    bg: LayerContent | ResponsiveBackground,
  ): bg is ResponsiveBackground => {
    return (
      typeof bg === "object" && !React.isValidElement(bg) && "default" in bg
    );
  };

  /**
   * Extracts the appropriate background content based on type
   * @param bg - Background content or configuration
   * @returns The resolved background content
   */
  const getBackgroundContent = (
    bg: LayerContent | ResponsiveBackground,
  ): LayerContent => {
    if (isResponsiveBackground(bg)) {
      // Use dark mode background if theme is dark
      if (resolvedTheme === "dark" && bg.dark) {
        return bg.dark; // Use dark mode background if available
      }
      return bg.default; // Use default background for light mode
    }
    return bg;
  };

  return (
    <div
      className={cn(
        "relative overflow-visible", // Base container styles
        className,
        classNames.container,
      )}
    >
      {/* Base Background Layer */}
      <Layer
        content={getBackgroundContent(background)}
        className={cn(
          "absolute inset-0 pointer-events-none select-none bg-cover bg-center",
          classNames.background,
        )}
      />

      {/* Optional Overlay */}
      {overlay && (
        <Layer
          content={overlay}
          className={cn(
            "absolute inset-0 pointer-events-none select-none",
            classNames.overlay,
          )}
        />
      )}

      {/* Content Layer */}
      <div className={cn("relative z-10", classNames.content)}>{children}</div>
    </div>
  );
}
