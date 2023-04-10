import {
    ComputerDesktopIcon,
    MoonIcon,
    SunIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

const themesList = ["light", "dark", "system"];

const themeIcons = {
    light: SunIcon,
    dark: MoonIcon,
    system: ComputerDesktopIcon,
};

const useTheme = () => {
    const [currentTheme, setCurrentTheme] = useState(
        localStorage.getItem("theme") || "system"
    );

    const theme = {
        value: currentTheme,
        label: currentTheme.charAt(0).toUpperCase() + currentTheme.slice(1),
        icon: themeIcons[currentTheme],
    };

    const themes = themesList.map((t) => {
        return {
            value: t,
            label: t.charAt(0).toUpperCase() + t.slice(1),
            icon: themeIcons[t],
        };
    });

    const nextTheme =
        themesList[(themesList.indexOf(currentTheme) + 1) % themesList.length];

    const setTheme = (theme) => {
        localStorage.setItem("theme", theme);
        setCurrentTheme(theme);

        if (
            localStorage.theme === "dark" ||
            ((!("theme" in localStorage) || localStorage.theme === "system") &&
                window.matchMedia("(prefers-color-scheme: dark)").matches)
        ) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    };

    const setThemeNext = () => {
        setTheme(nextTheme);
    };

    return {
        theme,
        themeIcons,
        themes,
        nextTheme,
        setThemeNext,
    };
};

export default useTheme;
