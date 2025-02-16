import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";
import { Button } from "../ui/button";

const buttonVariants = cva(
    "font-semibold rounded-lg transition-all border shadow-sm",
    {
        variants: {
            variant: {
                default:
                    "border-blue-800 bg-gradient-to-b from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800",
                warning: "bg-warning text-white hover:bg-warning/80",
                warningOutline:
                    "border-warning text-warning bg-white hover:bg-warning hover:text-white",
                warningDefault:
                    "text-black bg-white hover:bg-black hover:text-white",
                success: "bg-green-500 text-white hover:bg-green-600",
                successOutline:
                    "border-green-500 text-green-500 bg-transparent hover:bg-green-500 hover:text-white",
                danger:
                    "border-red-500 bg-gradient-to-b from-red-500 to-red-700 text-white hover:from-red-600 hover:to-red-800",
                dangerOutline:
                    "border-red-500 text-red-500 bg-transparent hover:bg-red-500 hover:text-white",
            },
            size: {
                default: "h-9 px-4 py-2",
                sm: "h-8 rounded-md px-3 text-xs",
                lg: "h-10 rounded-md px-8"  ,
                icon: "h-9 w-9",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);


interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "warning" | "warningOutline" | "success" | "successOutline" | "warningDefault" | "danger" | "dangerOutline";
    size?: "sm" | "icon" | "lg" | "default";
}

export function CustomButton({ variant, size, className, ...props }: ButtonProps) {
    return <Button className={cn(buttonVariants({ variant, size }), className)} size={size} {...props} />;
}
