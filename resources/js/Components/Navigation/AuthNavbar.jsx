import { Bars3Icon } from "@heroicons/react/24/outline";
import { Link, useForm, usePage } from "@inertiajs/react";
import ProfileDropdown from "../ProfileDropdown";

const AuthNavbar = ({
    showSidebar,
    setShowSidebar,
    sidebarToggleRef,
    ...props
}) => {
    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    return (
        <nav
            {...props}
            className="max-md:px-responsive flex items-center justify-between border-b border-gray-300 bg-gray-200 py-4 dark:border-gray-700 dark:bg-gray-800"
        >
            {/* Left */}
            <div
                className={`${
                    showSidebar ? "md:pl-7" : "md:pl-responsive"
                } md:w-sidebar flex justify-between`}
            >
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

                <button
                    ref={sidebarToggleRef}
                    onClick={toggleSidebar}
                    type="button"
                    className="max-md:hidden"
                >
                    <Bars3Icon className="h-6 w-6 stroke-2 transition-opacity hover:opacity-75" />
                </button>
            </div>

            {/* Right */}
            <div
                className={`${
                    showSidebar ? "md:pr-7" : "md:pr-responsive"
                } flex flex-grow items-center justify-end`}
            >
                <button
                    ref={sidebarToggleRef}
                    onClick={toggleSidebar}
                    type="button"
                    className="md:hidden"
                >
                    <Bars3Icon className="h-6 w-6 stroke-2 transition-opacity hover:opacity-75" />
                </button>

                <div className="flex items-center gap-x-5 max-md:hidden">
                    <ProfileDropdown positionClass="z-10 right-0 mt-3" />
                </div>
            </div>
        </nav>
    );
};

export default AuthNavbar;
