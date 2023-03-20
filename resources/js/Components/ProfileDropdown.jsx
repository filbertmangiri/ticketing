import { auth } from "@/Helpers/Auth";
import { Menu, Transition } from "@headlessui/react";
import {
    ArrowRightOnRectangleIcon,
    Cog6ToothIcon,
    UserIcon,
} from "@heroicons/react/24/outline";
import { Link, useForm } from "@inertiajs/react";
import React, { Fragment } from "react";
import ThemeToggle from "./ThemeToggle";

const ProfileDropdown = ({ positionClass, ...props }) => {
    const { post } = useForm();

    const logoutHandler = () => {
        post(route("logout"));
    };

    return (
        <Menu as="div" className="relative">
            <Menu.Button className="group flex items-center gap-3">
                <img
                    src={auth().user.profile_picture}
                    className="h-10 w-10 rounded-full ring-1 ring-gray-900 group-hover:ring-2 group-hover:ring-gray-600 dark:ring-gray-100 dark:group-hover:ring-gray-400"
                    alt="My profile picture"
                />

                <div className="flex flex-col group-hover:text-gray-700 dark:group-hover:text-gray-300">
                    <span className="whitespace-nowrap text-left text-sm">
                        {auth().user.name}
                    </span>
                    <span className="whitespace-nowrap text-left text-sm">
                        {auth().user.email}
                    </span>
                </div>
            </Menu.Button>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items
                    static
                    className={`${
                        positionClass || ""
                    } absolute w-fit divide-y divide-gray-400 rounded-xl border border-gray-400 bg-gray-100 shadow-lg dark:divide-gray-600 dark:border-gray-600 dark:bg-gray-900`}
                >
                    <div>
                        <Menu.Item as="div" className="p-2">
                            {({ close }) => (
                                <Link
                                    href={route(
                                        "user.show",
                                        auth().user.username
                                    )}
                                    onClick={close}
                                    className="flex gap-3 whitespace-nowrap rounded-lg px-4 py-2 text-sm text-gray-800 transition-all hover:bg-gray-200 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-100"
                                >
                                    <UserIcon className="h-5 w-5" />
                                    <span>My Profile</span>
                                </Link>
                            )}
                        </Menu.Item>
                        <Menu.Item as="div" className="p-2">
                            {({ close }) => (
                                <Link
                                    href={route("account.settings")}
                                    onClick={close}
                                    className="flex gap-3 whitespace-nowrap rounded-lg px-4 py-2 text-sm text-gray-800 transition-all hover:bg-gray-200 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-100"
                                >
                                    <Cog6ToothIcon className="h-5 w-5" />
                                    <span>Account Settings</span>
                                </Link>
                            )}
                        </Menu.Item>
                        <Menu.Item as="div" className="p-2">
                            {({ close }) => <ThemeToggle />}
                        </Menu.Item>
                    </div>
                    <Menu.Item as="div" className="p-2">
                        {({ close }) => (
                            <button
                                onClick={() => {
                                    logoutHandler();
                                    close();
                                }}
                                type="button"
                                className="flex w-full gap-3 whitespace-nowrap rounded-lg px-4 py-2 text-left text-sm text-red-600 transition-all hover:bg-red-500 hover:text-gray-100 dark:text-red-400 dark:hover:bg-red-500 dark:hover:text-gray-100"
                            >
                                <ArrowRightOnRectangleIcon className="h-5 w-5" />
                                <span>Logout</span>
                            </button>
                        )}
                    </Menu.Item>
                </Menu.Items>
            </Transition>
        </Menu>
    );
};

export default ProfileDropdown;
