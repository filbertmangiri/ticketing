import { Menu, Transition } from "@headlessui/react";
import { FunnelIcon } from "@heroicons/react/24/outline";
import React, { Fragment } from "react";

const Filter = ({ params, setParams }) => {
    return (
        <Menu as="div" className="relative">
            <Menu.Button>
                <FunnelIcon
                    className={`${
                        params.filter != "" && "text-yellow-500"
                    } h-6 w-6 stroke-2 transition-opacity hover:opacity-75`}
                />
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
                <Menu.Items className="absolute right-0 z-30 w-fit divide-y divide-gray-400 whitespace-nowrap rounded-lg border border-gray-300 bg-gray-100 text-sm shadow dark:divide-gray-600 dark:border-gray-700 dark:bg-gray-900">
                    <Menu.Item
                        as="button"
                        onClick={() =>
                            setParams({
                                ...params,
                                filter: "",
                            })
                        }
                        disabled={params.filter == ""}
                        className={`${
                            params.filter == "" &&
                            "cursor-default bg-gray-400 dark:bg-gray-600"
                        } flex w-full items-center rounded-t-lg px-4 py-2 text-left hover:bg-gray-400 dark:hover:bg-gray-600`}
                    >
                        Without deleted records
                    </Menu.Item>
                    <Menu.Item
                        as="button"
                        onClick={() =>
                            setParams({
                                ...params,
                                filter: "with-deleted",
                            })
                        }
                        disabled={params.filter == "with-deleted"}
                        className={`${
                            params.filter == "with-deleted" &&
                            "cursor-default bg-gray-400 dark:bg-gray-600"
                        } flex w-full items-center px-4 py-2 text-left hover:bg-gray-400 dark:hover:bg-gray-600`}
                    >
                        <span>With deleted records</span>
                    </Menu.Item>
                    <Menu.Item
                        as="button"
                        onClick={() =>
                            setParams({
                                ...params,
                                filter: "only-deleted",
                            })
                        }
                        disabled={params.filter == "only-deleted"}
                        className={`${
                            params.filter == "only-deleted" &&
                            "cursor-default bg-gray-400 dark:bg-gray-600"
                        } flex w-full items-center rounded-b-lg px-4 py-2 text-left hover:bg-gray-400 dark:hover:bg-gray-600`}
                    >
                        <span>Only deleted records</span>
                    </Menu.Item>
                </Menu.Items>
            </Transition>
        </Menu>
    );
};

export default Filter;
