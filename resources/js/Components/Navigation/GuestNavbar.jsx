import { Link, usePage } from "@inertiajs/react";
import ThemeToggle from "../ThemeToggle";

const GuestNavbar = ({ ...props }) => {
    const { app } = usePage().props;

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
                <ThemeToggle />
            </div>
        </nav>
    );
};

export default GuestNavbar;
