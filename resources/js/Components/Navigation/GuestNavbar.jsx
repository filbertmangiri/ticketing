import useTheme from "@/Hooks/useTheme";
import { Link } from "@inertiajs/react";

const GuestNavbar = ({ ...props }) => {
    const { theme, setThemeNext } = useTheme();

    return (
        <nav
            {...props}
            className="px-responsive flex items-center justify-between border-b border-gray-300 bg-gray-200 py-4 dark:border-gray-700 dark:bg-gray-800"
        >
            {/* Left */}
            <div className="flex">
                <Link href="/" className="flex gap-x-3" title="Go to home page">
                    <img
                        src="/assets/img/intecs-logo.png"
                        alt="Intecs Logo"
                        className="block h-14 dark:hidden"
                    />
                    <img
                        src="/assets/img/intecs-logo-dark.png"
                        alt="Intecs Logo"
                        className="hidden h-14 dark:block"
                    />
                </Link>
            </div>

            {/* Right */}
            <div>
                <button
                    {...props}
                    onClick={setThemeNext}
                    type="button"
                    className="flex w-full gap-3 whitespace-nowrap rounded-lg px-4 py-2 text-sm text-gray-800 transition-all hover:bg-gray-300 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-100"
                >
                    <theme.icon className="h-5 w-5 stroke-2 transition-opacity hover:opacity-75" />
                    <span>Theme ({theme.label})</span>
                </button>
            </div>
        </nav>
    );
};

export default GuestNavbar;
