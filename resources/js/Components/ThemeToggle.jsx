import {
    ComputerDesktopIcon,
    MoonIcon,
    SunIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

const ThemeToggle = ({ ...props }) => {
    const [theme, setTheme] = useState(localStorage.theme || null);

    const themes = ["light", "dark", null];

    const toggleTheme = () => {
        const nextTheme =
            themes[(themes.indexOf(localStorage.theme) + 1) % themes.length];

        setTheme(nextTheme);

        if (nextTheme == null) {
            localStorage.removeItem("theme");
        } else {
            localStorage.theme = nextTheme;
        }

        if (
            localStorage.theme === "dark" ||
            (!("theme" in localStorage) &&
                window.matchMedia("(prefers-color-scheme: dark)").matches)
        ) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    };

    return (
        <button
            {...props}
            onClick={toggleTheme}
            type="button"
            className="flex w-full gap-3 whitespace-nowrap rounded-lg px-4 py-2 text-sm text-gray-800 transition-all hover:bg-gray-200 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-100"
        >
            {theme == "light" ? (
                <>
                    <SunIcon className="h-5 w-5 stroke-2 transition-opacity hover:opacity-75" />
                    <span>Theme (Light)</span>
                </>
            ) : theme == "dark" ? (
                <>
                    <MoonIcon className="h-5 w-5 stroke-2 transition-opacity hover:opacity-75" />
                    <span>Theme (Dark)</span>
                </>
            ) : (
                <>
                    <ComputerDesktopIcon className="h-5 w-5 stroke-2 transition-opacity hover:opacity-75" />
                    <span>Theme (System)</span>
                </>
            )}
        </button>
    );
};

export default ThemeToggle;
