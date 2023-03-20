import React from "react";

const Radio = ({ children, ...props }) => {
    return <div {...props}>{children}</div>;
};

Radio.Label = ({ children, ...props }) => {
    return (
        <label {...props} className="mb-2 block text-sm font-medium">
            {children}
        </label>
    );
};

Radio.Options = ({ inline, currentChecked, options, ...props }) => {
    const unique = (key_1, key_2) => {
        return `${key_1.replace(/\W+/g, "_")}-${key_2.replace(/\W+/g, "_")}`;
    };

    return (
        <div className={inline && "flex gap-x-4"}>
            {options.map((option) => (
                <div
                    key={unique(option.value, option.label)}
                    className="flex items-center gap-x-2"
                >
                    <input
                        {...props}
                        id={unique(option.value, option.label)}
                        type="radio"
                        value={option.value}
                        checked={currentChecked === option.value}
                        className="h-4 w-4 border-gray-500 bg-gray-300 text-blue-600 ring-offset-gray-200 focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                    />
                    <label
                        htmlFor={unique(option.value, option.label)}
                        className="text-sm font-medium"
                    >
                        {option.label}
                    </label>
                </div>
            ))}
        </div>
    );
};

export default Radio;
