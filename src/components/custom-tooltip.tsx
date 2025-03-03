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
  delayDuration = 700,
}: {
  children: ReactNode;
  content: ReactNode | string;
  side?: "top" | "right" | "bottom" | "left";
  delayDuration?: number;
}) => {
  return (
    <>
      <TooltipProvider>
        <Tooltip delayDuration={delayDuration}>
          <TooltipTrigger asChild>{children}</TooltipTrigger>
          <TooltipContent
            hidden={!content || content == ""}
            className="bg-black text-white"
            side={side}
          >
            {content}
            <Arrow />
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
};
