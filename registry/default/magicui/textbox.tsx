import React from "react";
import { VariantProps } from "class-variance-authority";
import Typography from "@/registry/default/magicui/typography";
import { cn } from "@/lib/utils";

export type TextBoxProps = {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  topContent?: React.ReactNode;
  bottomContent?: React.ReactNode;
  className?: string;
  classNames?: {
    container?: string;
    title?: string;
    subtitle?: string;
    topContent?: string;
    bottomContent?: string;
  };
} & VariantProps<typeof Typography>;

/**
 * LandingText component for the main section of a page with announcements,
 * headings, and call-to-action buttons.
 */
const TextBox: React.FC<TextBoxProps> = ({
  title,
  subtitle,
  topContent,
  bottomContent,
  className,
  classNames = {},
}) => {
  return (
    <div className={cn("flex flex-col gap-6", className, classNames.container)}>
      {topContent && (
        <div className={cn("mb-4", classNames.topContent)}>{topContent}</div>
      )}
      {title && (
        <Typography
          as="h1"
          variant="hero"
          size="6xl"
          className={cn("text-foreground", classNames.title)}
        >
          {title}
        </Typography>
      )}
      {subtitle && (
        <Typography
          as="h3"
          variant="subtitle"
          size="xl"
          className={cn("text-foreground-700", classNames.subtitle)}
        >
          {subtitle}
        </Typography>
      )}
      {bottomContent && (
        <div className={cn("mt-4", classNames.bottomContent)}>
          {bottomContent}
        </div>
      )}
    </div>
  );
};

export default TextBox;
