import {
    ArrowRightOnRectangleIcon,
    Cog6ToothIcon,
    UserIcon,
} from "@heroicons/react/24/outline";
import { Link, useForm } from "@inertiajs/react";
import Dropdown from "./Dropdown";
import useTheme from "@/Hooks/useTheme";
import { auth } from "@/Helpers/Auth";
import { twMerge } from "tailwind-merge";

const ProfileDropdown = ({ positionClass, ...props }) => {
    const { theme, setThemeNext } = useTheme();

    const { post } = useForm();

    const logoutHandler = () => {
        post(route("logout"));
    };

    return (
        <Dropdown>
            <Dropdown.Button className="group flex items-center gap-x-2.5">
                <picture>
                    <img
                        className="h-10 rounded-full ring-1 ring-slate-700 transition-all group-hover:ring-2 group-hover:ring-slate-500 dark:ring-slate-300"
                        src={auth().user.profile_picture}
                        alt="My profile picture"
                    />
                </picture>
                <div className="flex flex-col text-left text-xs transition-all group-hover:text-slate-600 dark:group-hover:text-slate-400">
                    <span>{auth().user.name}</span>
                    <span>{auth().user.email}</span>
                </div>
            </Dropdown.Button>

            <Dropdown.Categories
                className={twMerge("right-0 z-10", positionClass)}
            >
                <Dropdown.Category label="profile">
                    <Dropdown.Item
                        as={Link}
                        icon={UserIcon}
                        href={route("user.show", auth().user.username)}
                    >
                        My Profile
                    </Dropdown.Item>
                    <Dropdown.Item
                        as={Link}
                        icon={Cog6ToothIcon}
                        href={route("account.settings")}
                    >
                        Account Settings
                    </Dropdown.Item>
                </Dropdown.Category>

                <Dropdown.Category label="misc">
                    <Dropdown.Item
                        icon={theme.icon}
                        onClick={setThemeNext}
                        preventClose
                    >
                        Theme ({theme.label})
                    </Dropdown.Item>
                </Dropdown.Category>

                <Dropdown.Category label="auth">
                    <Dropdown.Item
                        icon={ArrowRightOnRectangleIcon}
                        className="text-red-600 hover:bg-red-600 dark:text-red-400"
                        onClick={logoutHandler}
                    >
                        Logout
                    </Dropdown.Item>
                </Dropdown.Category>
            </Dropdown.Categories>
        </Dropdown>
    );
};

export default ProfileDropdown;
