import { cn } from "@/lib/utils";
import React from "react";

/**
 * Utility type for polymorphic ref
 */
type PolymorphicRef<C extends React.ElementType> =
  React.ComponentPropsWithRef<C>["ref"];

/**
 * Props for the 'as' prop to enable polymorphic behavior
 */
type AsProp<C extends React.ElementType> = {
  as?: C;
};

/**
 * Utility type to omit conflicting props
 */
type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P);

/**
 * Base polymorphic component props without ref
 */
type PolymorphicComponentProp<
  C extends React.ElementType,
  Props = {},
> = React.PropsWithChildren<Props & AsProp<C>> &
  Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

/**
 * Polymorphic component props with ref support
 */
type PolymorphicComponentPropWithRef<
  C extends React.ElementType,
  Props = {},
> = PolymorphicComponentProp<C, Props> & { ref?: PolymorphicRef<C> };

/**
 * Available variants for the Typography component
 */
type TypographyVariant = "primary" | "secondary" | "ghost" | "muted";

/**
 * Available sizes for the Typography component
 */
type TypographySize =
  | "xs"
  | "sm"
  | "base"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl";

/**
 * Props specific to the Typography component
 */
type TypographyProps<C extends React.ElementType> =
  PolymorphicComponentPropWithRef<
    C,
    {
      /** Style variant of the text */
      variant?: TypographyVariant;
      /** Size of the text */
      size?: TypographySize;
    }
  >;

/**
 * Type definition for the Typography component itself
 */
type TypographyComponent = <C extends React.ElementType = "p">(
  props: TypographyProps<C>,
) => React.ReactElement;

/**
 * A polymorphic Typography component that supports various text styles and sizes.
 * @example
 * ```tsx
 * <Typography as="h1" size="4xl" variant="primary">
 *   Heading
 * </Typography>
 *
 * <Typography as="p" size="lg" variant="secondary">
 *   Paragraph text
 * </Typography>
 * ```
 */
const Typography = React.forwardRef(function Typography<
  C extends React.ElementType = "p",
>(
  {
    as,
    className,
    variant,
    size = "base",
    children,
    ...props
  }: TypographyProps<C>,
  ref?: PolymorphicRef<C>,
): React.ReactElement {
  const Component = as || "p";

  return (
    <Component
      ref={ref}
      className={cn(
        // Base styles
        "text-foreground",

        // Variants
        {
          // Primary variant - bold, prominent text
          "font-semibold": variant === "primary",

          // Secondary variant - slightly muted text
          "text-foreground/80": variant === "secondary",

          // Ghost variant - more muted text
          "text-foreground/60": variant === "ghost",

          // Muted variant - maximum contrast reduction
          "text-muted-foreground": variant === "muted",
        },

        // Text sizes mapping to Tailwind's scale
        {
          "text-xs": size === "xs", // 12px
          "text-sm": size === "sm", // 14px
          "text-base": size === "base", // 16px
          "text-lg": size === "lg", // 18px
          "text-xl": size === "xl", // 20px
          "text-2xl": size === "2xl", // 24px
          "text-3xl": size === "3xl", // 30px
          "text-4xl": size === "4xl", // 36px
          "text-5xl": size === "5xl", // 48px
        },
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}) as TypographyComponent;

export default Typography;
