import { forwardRef, ButtonHTMLAttributes } from "react";
import { cn } from "@/shared/lib/classnames";
import styles from "./button.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(styles.button, className)}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "SharedUIButton";
