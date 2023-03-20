import { can } from "@/Helpers/Permission";
import DashboardLayout from "@/Layouts/Dashboard";
import { Tab } from "@headlessui/react";
import { twMerge } from "tailwind-merge";
import ProductsTable from "./ProductsTable";

const Show = ({ category, categories, products }) => {
    return (
        <Tab.Group as="div" className="flex h-full w-full flex-col gap-y-2">
            <Tab.List className="flex space-x-1 rounded-xl bg-gray-200 p-1 dark:bg-gray-800">
                <Tab
                    className={({ selected }) =>
                        twMerge(
                            "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                            "ring-gray-100 ring-opacity-60 ring-offset-2 focus:outline-none dark:ring-gray-900",
                            selected
                                ? "bg-gray-100 shadow dark:bg-gray-900"
                                : "text-gray-600 hover:bg-gray-100/[0.50] dark:text-gray-400 dark:hover:bg-gray-900/[0.50]"
                        )
                    }
                >
                    Details
                </Tab>

                {can("view any products") && (
                    <Tab
                        className={({ selected }) =>
                            twMerge(
                                "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                                "ring-gray-100 ring-opacity-60 ring-offset-2 focus:outline-none dark:ring-gray-900",
                                selected
                                    ? "bg-gray-100 shadow dark:bg-gray-900"
                                    : "text-gray-600 hover:bg-gray-100/[0.50] dark:text-gray-400 dark:hover:bg-gray-900/[0.50]"
                            )
                        }
                    >
                        Products
                    </Tab>
                )}
            </Tab.List>

            <Tab.Panels className="flex-grow">
                <Tab.Panel className="h-full rounded-lg border border-gray-300 bg-gray-200 p-4 dark:border-gray-700 dark:bg-gray-800">
                    This is details
                </Tab.Panel>
                {can("view any products") && (
                    <Tab.Panel className="h-full rounded-lg border border-gray-300 bg-gray-200 p-4 dark:border-gray-700 dark:bg-gray-800">
                        <ProductsTable
                            category={category}
                            productsResource={products}
                            categories={categories}
                        />
                    </Tab.Panel>
                )}
            </Tab.Panels>
        </Tab.Group>
    );
};

Show.layout = (page) => <DashboardLayout children={page} title="Categories" />;

export default Show;
