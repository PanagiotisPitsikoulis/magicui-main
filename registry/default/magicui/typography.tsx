import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

const typographyVariants = cva("text-foreground", {
  variants: {
    variant: {
      // Core variants
      primary: "font-semibold",
      secondary: "text-foreground/80",
      ghost: "text-foreground/60",
      muted: "text-muted-foreground",

      // Title variants with extended styles
      hero: "font-extrabold text-foreground capitalize tracking-tight", // Tighter tracking for titles
      title: "font-bold text-foreground capitalize tracking-tight", // Tighter tracking for titles
      subtitle: "font-medium text-foreground-700",

      // Additional semantic variants
      success: "text-green-600 dark:text-green-400",
      warning: "text-yellow-600 dark:text-yellow-400",
      danger: "text-red-600 dark:text-red-400",
      info: "text-blue-600 dark:text-blue-400",

      // Special variants
      gradient:
        "bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary",
      highlight: "bg-primary/10 text-primary px-1 py-0.5 rounded",
      code: "font-mono bg-muted px-1.5 py-0.5 rounded",
    },

    size: {
      "2xs": "text-[0.625rem] leading-[1rem]", // 10px
      xs: "text-xs leading-[1.25rem]", // 12px
      sm: "text-sm leading-5", // 14px
      base: "text-base leading-6", // 16px
      lg: "text-lg leading-7", // 18px
      xl: "text-xl leading-[1.75rem]", // 20px
      "2xl": "text-2xl leading-8", // 24px
      "3xl": "text-3xl leading-9", // 30px
      "4xl": "text-4xl leading-10", // 36px
      "5xl": "text-5xl leading-[3.5rem]", // 48px
      "6xl": "text-6xl leading-[4rem]", // 60px
      "7xl": "text-7xl leading-[4.5rem]", // 72px
      "8xl": "text-8xl leading-[5rem]", // 96px
      "9xl": "text-9xl leading-[6rem]", // 128px
    },

    weight: {
      thin: "font-thin",
      extralight: "font-extralight",
      light: "font-light",
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
      extrabold: "font-extrabold",
      black: "font-black",
    },

    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
      justify: "text-justify",
    },

    tracking: {
      tighter: "tracking-tighter", // Tighter tracking for more cohesive titles
      tight: "tracking-tight", // Slightly tight tracking for regular text
      normal: "tracking-normal",
      wide: "tracking-wide",
      wider: "tracking-wider",
      widest: "tracking-widest",
    },
  },

  defaultVariants: {
    variant: "primary",
    size: "base",
    weight: "normal",
    align: "left",
    tracking: "normal",
  },
});

type TypographyProps<C extends React.ElementType = "p"> =
  React.PropsWithChildren<{
    as?: C;
    variant?:
      | "primary"
      | "secondary"
      | "ghost"
      | "muted"
      | "hero"
      | "title"
      | "subtitle"
      | "success"
      | "warning"
      | "danger"
      | "info"
      | "gradient"
      | "highlight"
      | "code";
    size?:
      | "2xs"
      | "xs"
      | "sm"
      | "base"
      | "lg"
      | "xl"
      | "2xl"
      | "3xl"
      | "4xl"
      | "5xl"
      | "6xl"
      | "7xl"
      | "8xl"
      | "9xl";
    weight?:
      | "thin"
      | "extralight"
      | "light"
      | "normal"
      | "medium"
      | "semibold"
      | "bold"
      | "extrabold"
      | "black";
    align?: "left" | "center" | "right" | "justify";
    tracking?: "tighter" | "tight" | "normal" | "wide" | "wider" | "widest";
    className?: string;
  }> &
    React.ComponentPropsWithRef<C>;

const Typography = React.forwardRef(function Typography<
  C extends React.ElementType = "p",
>(
  {
    as,
    className,
    variant,
    size,
    weight,
    align,
    tracking,
    children,
    ...props
  }: TypographyProps<C>,
  ref?: React.Ref<HTMLElement>,
) {
  const Component = as || "p";
  const classes = typographyVariants({
    variant,
    size,
    weight,
    align,
    tracking,
  });

  return (
    <Component ref={ref} className={cn(classes, className)} {...props}>
      {children}
    </Component>
  );
});

Typography.displayName = "Typography";

export default Typography;
