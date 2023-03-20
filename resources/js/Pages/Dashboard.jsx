import DashboardLayout from "@/Layouts/Dashboard";
import {
    BuildingOffice2Icon,
    BuildingOfficeIcon,
    DevicePhoneMobileIcon,
    FlagIcon,
    MapPinIcon,
    TagIcon,
    TicketIcon,
    UsersIcon,
} from "@heroicons/react/24/outline";
import { Link } from "@inertiajs/react";

const Dashboard = ({
    tickets,
    users,
    departments,
    sub_departments,
    categories,
    products,
    priorities,
    locations,
}) => {
    return (
        <div className="grid w-full grid-cols-3 justify-between gap-4">
            <Link
                href={route("ticket.index")}
                as="button"
                className="flex h-fit w-full items-center justify-between rounded-xl border border-gray-300 bg-gray-200 p-4 shadow-lg hover:bg-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            >
                <div className="flex flex-col items-start">
                    <div className="text-2xl font-bold">Tickets</div>
                    <div className="text-md">Tickets: {tickets}</div>
                </div>

                <TicketIcon className="h-10 w-10" />
            </Link>
            <Link
                href={route("user.index")}
                as="button"
                className="flex h-fit w-full items-center justify-between rounded-xl border border-gray-300 bg-gray-200 p-4 shadow-lg hover:bg-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            >
                <div className="flex flex-col items-start">
                    <div className="text-2xl font-bold">Users</div>
                    <div className="text-md">Users: {users}</div>
                </div>

                <UsersIcon className="h-10 w-10" />
            </Link>
            <Link
                href={route("department.index")}
                as="button"
                className="flex h-fit w-full items-center justify-between rounded-xl border border-gray-300 bg-gray-200 p-4 shadow-lg hover:bg-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            >
                <div className="flex flex-col items-start">
                    <div className="text-2xl font-bold">Departments</div>
                    <div className="text-md">Departments: {departments}</div>
                </div>

                <BuildingOffice2Icon className="h-10 w-10" />
            </Link>
            <Link
                href={route("subDepartment.index")}
                as="button"
                className="flex h-fit w-full items-center justify-between rounded-xl border border-gray-300 bg-gray-200 p-4 shadow-lg hover:bg-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            >
                <div className="flex flex-col items-start">
                    <div className="text-2xl font-bold">Sub Departments</div>
                    <div className="text-md">
                        Sub Departments: {sub_departments}
                    </div>
                </div>

                <BuildingOfficeIcon className="h-10 w-10" />
            </Link>
            <Link
                href={route("category.index")}
                as="button"
                className="flex h-fit w-full items-center justify-between rounded-xl border border-gray-300 bg-gray-200 p-4 shadow-lg hover:bg-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            >
                <div className="flex flex-col items-start">
                    <div className="text-2xl font-bold">Categories</div>
                    <div className="text-md">Categories: {categories}</div>
                </div>

                <TagIcon className="h-10 w-10" />
            </Link>
            <Link
                href={route("product.index")}
                as="button"
                className="flex h-fit w-full items-center justify-between rounded-xl border border-gray-300 bg-gray-200 p-4 shadow-lg hover:bg-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            >
                <div className="flex flex-col items-start">
                    <div className="text-2xl font-bold">Products</div>
                    <div className="text-md">Products: {products}</div>
                </div>

                <DevicePhoneMobileIcon className="h-10 w-10" />
            </Link>
            <Link
                href={route("priority.index")}
                as="button"
                className="flex h-fit w-full items-center justify-between rounded-xl border border-gray-300 bg-gray-200 p-4 shadow-lg hover:bg-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            >
                <div className="flex flex-col items-start">
                    <div className="text-2xl font-bold">Priorities</div>
                    <div className="text-md">Priorities: {priorities}</div>
                </div>

                <FlagIcon className="h-10 w-10" />
            </Link>
            <Link
                href={route("location.index")}
                as="button"
                className="flex h-fit w-full items-center justify-between rounded-xl border border-gray-300 bg-gray-200 p-4 shadow-lg hover:bg-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            >
                <div className="flex flex-col items-start">
                    <div className="text-2xl font-bold">Locations</div>
                    <div className="text-md">Locations: {locations}</div>
                </div>

                <MapPinIcon className="h-10 w-10" />
            </Link>
        </div>
    );
};

Dashboard.layout = (page) => (
    <DashboardLayout children={page} title="Dashboard" />
);

export default Dashboard;
