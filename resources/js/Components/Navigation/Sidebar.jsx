import { Link } from "@inertiajs/react";
import { useEffect, useRef } from "react";
import ProfileDropdown from "../ProfileDropdown";

const Sidebar = ({
    showSidebar,
    setShowSidebar,
    sidebarToggleRef,
    children,
    ...props
}) => {
    const sidebarRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                sidebarRef.current &&
                !sidebarRef.current.contains(event.target) &&
                !sidebarToggleRef.current.contains(event.target) &&
                window.innerWidth <= 768
            ) {
                setShowSidebar(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [sidebarRef]);

    return (
        <aside
            {...props}
            ref={sidebarRef}
            className="w-sidebar z-40 h-full border-r border-gray-300 bg-gray-200 dark:border-gray-700 dark:bg-gray-800 max-md:absolute"
        >
            <div className="flex h-full flex-col">
                {/* Links */}
                <ul className="custom-scrollbar flex flex-grow flex-col gap-y-2 overflow-y-auto py-5">
                    {children}
                </ul>

                {/* Footer */}
                <div className="px-3 py-2 md:hidden">
                    <ProfileDropdown positionClass="-top-72 left-0" />
                </div>
            </div>
        </aside>
    );
};

Sidebar.Item = ({
    icon,
    routeName,
    routeCheck,
    setShowSidebar,
    children,
    ...props
}) => {
    const activeClass =
        "bg-blue-500/20 text-blue-800 dark:bg-blue-500/20 dark:text-blue-50";
    const inactiveClass =
        "text-gray-600 hover:bg-gray-300 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200";

    // if routeCheck an array, check if any of the routes in the array is active
    const isActive = Array.isArray(routeCheck)
        ? routeCheck.some((item) => route().current(item))
        : route().current(routeCheck);

    return (
        <li>
            <Link
                {...props}
                href={route(routeName)}
                onClick={() => {
                    if (window.innerWidth <= 768) {
                        setShowSidebar(false);
                    }
                }}
                className={`mx-3 flex items-center gap-x-3 whitespace-nowrap rounded-lg px-4 py-2 ${
                    isActive ? activeClass : inactiveClass
                }`}
            >
                {icon}
                {children}
            </Link>
        </li>
    );
};

export default Sidebar;
