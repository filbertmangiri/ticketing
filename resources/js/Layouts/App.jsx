import { Toast } from "@/Helpers/Toast";
import { Head, usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";

const AppLayout = ({ title, children }) => {
    const { alert } = usePage().props;

    const applyTheme = (isDark) => {
        if (isDark) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    };

    const themeInit = () => {
        if (!window.matchMedia) {
            return;
        }

        const isDark =
            localStorage.theme === "dark" ||
            (!("theme" in localStorage) &&
                window.matchMedia("(prefers-color-scheme: dark)").matches);

        applyTheme(isDark);

        window
            .matchMedia("(prefers-color-scheme: dark)")
            .addEventListener("change", (e) => applyTheme(e.matches));
    };

    useEffect(() => {
        themeInit();
    }, []);

    useEffect(() => {
        alert && Toast(alert.type, alert.message);
    }, [alert]);

    return (
        <div className="bg-gray-100 font-sans text-black antialiased dark:bg-gray-900 dark:text-white">
            <Head>
                <title>{title}</title>
            </Head>

            <ToastContainer />

            {children}

            {/* <div className="fixed top-0 right-0 m-8 flex h-6 w-6 items-center justify-center rounded-full bg-gray-700 p-3 font-mono text-xs text-white sm:bg-pink-500 md:bg-orange-500 lg:bg-green-500 xl:bg-blue-500">
                <div className="block  sm:hidden md:hidden lg:hidden xl:hidden">
                    xs
                </div>
                <div className="hidden sm:block  md:hidden lg:hidden xl:hidden">
                    sm
                </div>
                <div className="hidden sm:hidden md:block  lg:hidden xl:hidden">
                    md
                </div>
                <div className="hidden sm:hidden md:hidden lg:block  xl:hidden">
                    lg
                </div>
                <div className="hidden sm:hidden md:hidden lg:hidden xl:block">
                    xl
                </div>
            </div> */}
        </div>
    );
};

export default AppLayout;
