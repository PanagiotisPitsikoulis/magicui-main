import { cn } from "@/lib/utils";
import { Card } from "@nextui-org/react";
import Iframe from "./iframe";

interface ComponentWrapperProps {
  className?: string;
  children: any;
}
const ComponentWrapper = ({ className, children }: ComponentWrapperProps) => {
  return <Iframe>{children}</Iframe>;
};

export default ComponentWrapper;
