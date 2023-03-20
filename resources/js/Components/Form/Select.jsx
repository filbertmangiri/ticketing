import React from "react";
import SelectTailwind from "react-tailwindcss-select";

const Select = ({ menuAbsolute = false, ...props }) => {
    return (
        <SelectTailwind
            {...props}
            classNames={{
                menuButton: ({ isDisabled }) =>
                    `flex text-sm border border-gray-500 dark:border-gray-500 rounded-lg ${
                        isDisabled
                            ? "bg-gray-500 dark:bg-gray-500"
                            : "bg-gray-300 dark:bg-gray-700"
                    }`,
                searchContainer: "relative py-1 px-2.5",
                searchIcon: "absolute w-5 h-5 mt-2.5 pb-0.5 ml-2 text-gray-500",
                searchBox:
                    "w-full py-2 pl-8 text-sm text-black dark:text-white bg-gray-200 dark:bg-gray-800 border border-gray-200 rounded focus:border-gray-200 focus:ring-0 focus:outline-none",
                menu: `${
                    menuAbsolute ? "absolute z-10" : ""
                } w-full bg-gray-300 dark:bg-gray-700 shadow-lg border rounded py-1 mt-1.5 text-sm text-gray-700`,
                listItem: ({ isSelected }) =>
                    `block px-2 py-2 cursor-pointer select-none truncate rounded ${
                        isSelected
                            ? `text-white bg-blue-500`
                            : `text-black dark:text-white hover:bg-blue-200 hover:text-black dark:hover:text-black`
                    }`,
                ChevronIcon: ({ open }) =>
                    `transition duration-300 w-6 h-6 p-0.5 ${
                        open
                            ? "transform rotate-90 text-black dark:text-white"
                            : "text-black dark:text-white"
                    }`,
                list: "overflow-y-auto custom-scrollbar max-h-40",
            }}
        />
    );
};

export default Select;
