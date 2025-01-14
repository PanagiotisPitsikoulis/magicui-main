import React from "react";

import { cva, VariantProps } from "class-variance-authority";
import Animate, { AnimatedWrapperProps } from "./animate";
import TextBox, { TextBoxProps } from "./textbox";
import { cn } from "@nextui-org/react";
import { useIsMobile } from "@/lib/use-is-mobile";

export interface LandingSectionProps
  extends VariantProps<typeof landingSectionStyles> {
  landingTextProps: TextBoxProps;
  content?: React.ReactNode;
  contentBottom?: boolean;
  className?: string;
  classNames?: {
    container?: string;
    contentWrapper?: string;
    textWrapper?: string;
  };
  animatedWrapperProps?: {
    animatedWrapperPropsContainer?: Partial<AnimatedWrapperProps>;
    animatedWrapperPropsText?: Partial<AnimatedWrapperProps>;
    animatedWrapperPropsContent?: Partial<AnimatedWrapperProps>;
  };
}

const landingSectionStyles = cva("max-lg:py-5 py-20", {
  variants: {
    orientation: {
      left: "text-left items-end justify-between",
      center: "text-center items-center",
      right: "text-left items-end justify-between",
    },
  },
  defaultVariants: {
    orientation: "center",
  },
});

const contentAlignmentStyles = cva("", {
  variants: {
    orientation: {
      left: "flex-row",
      center: "flex-col",
      right: "flex-row-reverse",
    },
  },
  defaultVariants: {
    orientation: "left",
  },
});

/**
 * LandingSection component that wraps LandingText with a styled section and optional content.
 * @param orientation - The orientation of the section and LandingText.
 * @param className - Additional class for the section container.
 * @param classNames - Classnames for specific parts of the section.
 * @param landingTextProps - Props to pass to the LandingText component.
 * @param content - Optional ReactNode to render alongside the text.
 * @param contentBottom - When true, renders the content at the bottom.
 * @param animatedWrapperProps - Props to pass to the AnimatedWrapper components.
 * @returns JSX.Element
 */
const Section: React.FC<LandingSectionProps> = ({
  orientation,
  className,
  classNames = {},
  landingTextProps,
  content,
  contentBottom = false,
  animatedWrapperProps,
}) => {
  const isMobile = useIsMobile();
  const renderContentBottom = isMobile || contentBottom;

  return (
    <Animate
      {...animatedWrapperProps?.animatedWrapperPropsContainer}
      className={cn(
        landingSectionStyles({ orientation }),
        "flex overflow-hidden",
        renderContentBottom
          ? "flex-col items-start"
          : contentAlignmentStyles({ orientation }),
        classNames.container,
        className,
      )}
    >
      <Animate {...animatedWrapperProps?.animatedWrapperPropsText}>
        <TextBox
          {...landingTextProps}
          orientation={
            isMobile
              ? orientation === "right"
                ? "left"
                : orientation
              : orientation
          }
        />
      </Animate>
      {content && (
        <Animate
          {...animatedWrapperProps?.animatedWrapperPropsContent}
          className={cn(
            !isMobile && !contentBottom && "w-[50vw]",
            isMobile && "h-fit flex items-start justify-start",
            renderContentBottom ? "mt-12 w-full" : "ml-4",
            classNames.contentWrapper,
          )}
        >
          {content}
        </Animate>
      )}
    </Animate>
  );
};

export default Section;
