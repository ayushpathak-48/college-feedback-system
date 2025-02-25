import React, { ReactNode } from "react";
import { Button, ButtonProps } from "./ui/button";
import { Loader } from "lucide-react";

type LoadingButtonprops = ButtonProps & {
  isLoading?: boolean;
  disabled?: boolean;
  loadingText?: string;
  children: ReactNode;
};
export const LoadingButton = ({
  isLoading = false,
  disabled = false,
  loadingText = "Please wait...",
  children,
  ...props
}: LoadingButtonprops) => {
  return (
    <Button {...props} disabled={disabled || isLoading}>
      {isLoading ? (
        <>
          <Loader className="mr-2 size-4 animate-spin" />
          {loadingText}
        </>
      ) : (
        children
      )}
    </Button>
  );
};
