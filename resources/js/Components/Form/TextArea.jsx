import { twMerge } from "tailwind-merge";

const TextArea = ({ children, ...props }) => {
    return <div {...props}>{children}</div>;
};

TextArea.Label = ({ htmlFor, children, hint, ...props }) => {
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

TextArea.Field = ({
    id,
    rows,
    value,
    placeholder,
    className = "",
    ...props
}) => {
    return (
        <textarea
            {...props}
            {...{ id }}
            {...{ placeholder }}
            value={value || ""}
            rows={rows || 3}
            className={twMerge(
                "custom-scrollbar w-full rounded-lg bg-gray-300 py-3 px-4 text-sm focus:ring-blue-500 dark:bg-gray-700",
                className
            )}
        ></textarea>
    );
};

TextArea.Errors = ({ errors, ...props }) => {
    return (
        errors && (
            <p
                {...props}
                className="mt-2 text-sm text-red-600 dark:text-red-400"
            >
                {errors}
            </p>
        )
    );
};

export default TextArea;
