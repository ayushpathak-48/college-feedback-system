import {
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import React, { ReactNode } from "react";
import { Tooltip } from "./ui/tooltip";
import { Arrow } from "@radix-ui/react-tooltip";

export const CustomTooltip = ({
  children,
  content,
  side = "top",
}: {
  children: ReactNode;
  content: ReactNode | string;
  side?: "top" | "right" | "bottom" | "left";
}) => {
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{children}</TooltipTrigger>
          <TooltipContent className="bg-black text-white" side={side}>
            {content}
            <Arrow />
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
};
