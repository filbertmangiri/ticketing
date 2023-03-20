import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";

const PerPage = ({ defaultPerPage, total, params, setParams }) => {
    const [perPages, setPerPages] = useState([]);

    useEffect(() => {
        let numbers = [defaultPerPage];

        for (let i = defaultPerPage * 2; i <= total; i += defaultPerPage) {
            if (i > 50) break;

            numbers.push(i);
        }

        setPerPages(numbers);
    }, [total]);

    return (
        <div className="space-x-0.5 text-sm">
            <span>Show</span>

            <Menu as="span" className="relative">
                <Menu.Button className="mx-1 rounded-md border border-gray-500 py-1 px-1.5 transition hover:bg-gray-100 dark:border-gray-500 dark:hover:bg-gray-900">
                    {params.load || defaultPerPage}
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
                    <Menu.Items className="absolute left-0 z-30 mt-2 w-fit rounded-xl border border-gray-400 bg-gray-100 shadow-lg dark:border-gray-600 dark:bg-gray-900">
                        {perPages.map((perPage, key) => (
                            <Menu.Item
                                key={`per-page-${key}`}
                                as="div"
                                className="p-1"
                            >
                                <button
                                    disabled={
                                        perPage ===
                                        (params.load || defaultPerPage)
                                    }
                                    onClick={(e) => {
                                        setParams({
                                            ...params,
                                            load: perPage,
                                        });
                                    }}
                                    className={`${
                                        perPage ==
                                        (params.load || defaultPerPage)
                                            ? "bg-gray-200 dark:bg-gray-800"
                                            : "hover:bg-gray-200 dark:hover:bg-gray-800"
                                    } block rounded-lg px-4 py-2 text-xs`}
                                >
                                    {perPage}
                                </button>
                            </Menu.Item>
                        ))}
                    </Menu.Items>
                </Transition>
            </Menu>

            <span>entries</span>
        </div>
    );
};

export default PerPage;
