import { cn } from "@/lib/utils";
import { Card } from "@nextui-org/react";

interface ComponentWrapperProps {
  className?: string;
  children: any;
}
const ComponentWrapper = ({ className, children }: ComponentWrapperProps) => {
  return (
    <Card
      isBlurred
      shadow='none'
      className={cn(
        "max-w-screen relative flex flex-col items-center justify-center rounded-xl bg-background p-0 md:border md:p-16",
        className
      )}
    >
      {children}
    </Card>
  );
};

export default ComponentWrapper;
