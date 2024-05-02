import { cva, VariantProps} from 'class-variance-authority'
import { FC } from "react";

const ButtonClasses = cva(
    [
        "rounded",
        "hover:scale-110",
        "active:scale-100",
        "transition",
        "duration-200",
        "ease-in-out",
    ],
    {
        variants: {
            intent: {
                primary: [
                    "bg-violet-500",
                    "text-white",
                    "border-transparent",
                    "hover:bg-violet-600",
                ],
                secondary: [
                    "bg-white",
                    "text-black",
                    "hover:bg-gray-100",
                ],
                text: ["bg-transparent", "text-black", "hover:bg-gray-100"],
            },
            size: {
                small: ["px-4", "py-1"],
                medium: ["px-6", "py-2"],
                large: ["px-8", "py-4"],
            },
        },
        defaultVariants: {
            intent: "primary",
            size: "medium",
        },
    }
);

export interface ButtonProps
    extends React.HTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof ButtonClasses> { type?: "button" | "submit" | "reset"; }

const Button: FC<ButtonProps> = ({
    children,
    className,
    intent,
    size,
    ...props
    }) => {
    return (
        <button className={ButtonClasses({ intent, size, className })} {...props}>
        {children}
        </button>
    );
};

export default Button;