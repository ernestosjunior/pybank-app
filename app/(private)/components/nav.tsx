import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction } from "react";
import { DialogAction } from "./dialog-action";

interface NavProps extends React.HTMLAttributes<HTMLElement> {
  setTransition: Dispatch<SetStateAction<boolean>>;
}

export function Nav({ className, setTransition, ...props }: NavProps) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <DialogAction variant="credit" setTransition={setTransition} />
      <DialogAction variant="debit" setTransition={setTransition} />
    </nav>
  );
}
