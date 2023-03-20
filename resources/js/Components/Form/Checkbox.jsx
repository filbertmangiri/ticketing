import React from "react";

const Checkbox = ({ children, ...props }) => {
    return (
        <div {...props} className="flex">
            {children}
        </div>
    );
};

Checkbox.Field = ({ id, children, ...props }) => {
    return (
        <input
            {...props}
            {...{ id }}
            type="checkbox"
            className="pointer-events-none mt-0.5 shrink-0 rounded border-gray-200 text-blue-600 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:checked:border-blue-500 dark:checked:bg-blue-500 dark:focus:ring-offset-gray-800"
        />
    );
};

Checkbox.Label = ({ htmlFor, children, ...props }) => {
    return (
        <label
            {...props}
            {...{ htmlFor }}
            className="ml-3 text-sm text-gray-500 dark:text-gray-400"
        >
            {children}
        </label>
    );
};

export default Checkbox;
