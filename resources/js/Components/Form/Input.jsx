import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

const Input = ({ children, ...props }) => {
    return <div {...props}>{children}</div>;
};

Input.Label = ({ htmlFor, children, hint, ...props }) => {
    return (
        <div className="flex items-center justify-between">
            <label
                {...props}
                {...{ htmlFor }}
                className="mb-2 block text-sm font-medium"
            >
                {children}
            </label>

            {hint && (
                <span className="mb-2 block text-sm text-gray-500">{hint}</span>
            )}
        </div>
    );
};

Input.Field = ({ type = "text", id, value, className = "", ...props }) => {
    return (
        <input
            {...props}
            {...{ id }}
            type={type}
            value={value || ""}
            className={twMerge(
                "w-full rounded-lg bg-gray-300 py-3 px-4 text-sm focus:ring-blue-500 dark:bg-gray-700",
                className
            )}
        />
    );
};

Input.Field.Password = ({ id, ...props }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="relative">
            <input
                {...props}
                {...{ id }}
                type={showPassword ? "text" : "password"}
                className="w-full rounded-lg bg-gray-300 py-3 px-4 text-sm focus:ring-blue-500 dark:bg-gray-700"
            />

            <button
                onClick={() => setShowPassword(!showPassword)}
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3"
            >
                {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400" />
                )}
            </button>
        </div>
    );
};

Input.Errors = ({ errors, className, ...props }) => {
    return (
        errors && (
            <p
                {...props}
                className={twMerge(
                    "mt-2 text-sm text-red-600 dark:text-red-400",
                    className
                )}
            >
                {errors}
            </p>
        )
    );
};

export default Input;
