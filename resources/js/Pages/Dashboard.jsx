import { can } from "@/Helpers/Permission";
import DashboardLayout from "@/Layouts/Dashboard";
import {
    BuildingOffice2Icon,
    BuildingOfficeIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    DevicePhoneMobileIcon,
    FlagIcon,
    MapPinIcon,
    TagIcon,
    UsersIcon,
} from "@heroicons/react/24/outline";
import { Link } from "@inertiajs/react";
import { useState } from "react";
import TicketList from "./Tickets/Index";

const Dashboard = ({
    tickets,
    technicians,
    users,
    departments,
    sub_departments,
    categories,
    products,
    priorities,
    locations,
    announcements,
}) => {
    announcements = announcements.data;

    const [announcement, setAnnouncement] = useState(announcements[0]);

    const setNextAnnouncement = () => {
        const index = announcements.indexOf(announcement);
        if (index + 1 < announcements.length) {
            setAnnouncement(announcements[index + 1]);
        } else {
            setAnnouncement(announcements[0]);
        }
    };

    const setPreviousAnnouncement = () => {
        const index = announcements.indexOf(announcement);
        if (index - 1 >= 0) {
            setAnnouncement(announcements[index - 1]);
        } else {
            setAnnouncement(announcements[announcements.length - 1]);
        }
    };

    return (
        <div className="flex w-full flex-col gap-y-10">
            {announcements.length > 0 && (
                <div className="flex flex-col gap-y-3">
                    <span className="text-xl font-bold">Announcements</span>
                    <div className="flex items-center gap-x-4 rounded-md bg-gray-200 p-5 text-sm shadow-lg dark:bg-gray-800">
                        <button
                            className="transition-all hover:text-gray-500"
                            onClick={setPreviousAnnouncement}
                        >
                            <ChevronLeftIcon className="h-5 w-5" />
                        </button>

                        <div className="flex flex-grow flex-col">
                            <div className="flex gap-x-3">
                                <span>{announcement.title}</span>
                                <span>({announcement.author?.name})</span>
                                <span>{announcement.created_at}</span>
                            </div>
                            <div>{announcement.body}</div>
                        </div>

                        <button
                            className="transition-all hover:text-gray-500"
                            onClick={setNextAnnouncement}
                        >
                            <ChevronRightIcon className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            )}

            <div className="flex flex-col gap-y-3">
                <span className="text-xl font-bold">
                    {can("view any ticket")
                        ? "Tickets"
                        : can("view assigned ticket")
                        ? "Assigned Tickets"
                        : "My Tickets"}
                </span>
                <TicketList tickets={tickets} technicians={technicians} />
            </div>

            <div className="grid w-full grid-cols-3 justify-between gap-4">
                {can("view any user") && (
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
                )}
                {can("view any department") && (
                    <Link
                        href={route("department.index")}
                        as="button"
                        className="flex h-fit w-full items-center justify-between rounded-xl border border-gray-300 bg-gray-200 p-4 shadow-lg hover:bg-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                    >
                        <div className="flex flex-col items-start">
                            <div className="text-2xl font-bold">
                                Departments
                            </div>
                            <div className="text-md">
                                Departments: {departments}
                            </div>
                        </div>

                        <BuildingOffice2Icon className="h-10 w-10" />
                    </Link>
                )}
                {can("view any sub_department") && (
                    <Link
                        href={route("subDepartment.index")}
                        as="button"
                        className="flex h-fit w-full items-center justify-between rounded-xl border border-gray-300 bg-gray-200 p-4 shadow-lg hover:bg-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                    >
                        <div className="flex flex-col items-start">
                            <div className="text-2xl font-bold">
                                Sub Departments
                            </div>
                            <div className="text-md">
                                Sub Departments: {sub_departments}
                            </div>
                        </div>

                        <BuildingOfficeIcon className="h-10 w-10" />
                    </Link>
                )}
                {can("view any category") && (
                    <Link
                        href={route("category.index")}
                        as="button"
                        className="flex h-fit w-full items-center justify-between rounded-xl border border-gray-300 bg-gray-200 p-4 shadow-lg hover:bg-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                    >
                        <div className="flex flex-col items-start">
                            <div className="text-2xl font-bold">Categories</div>
                            <div className="text-md">
                                Categories: {categories}
                            </div>
                        </div>

                        <TagIcon className="h-10 w-10" />
                    </Link>
                )}
                {can("view any product") && (
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
                )}
                {can("view any priority") && (
                    <Link
                        href={route("priority.index")}
                        as="button"
                        className="flex h-fit w-full items-center justify-between rounded-xl border border-gray-300 bg-gray-200 p-4 shadow-lg hover:bg-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                    >
                        <div className="flex flex-col items-start">
                            <div className="text-2xl font-bold">Priorities</div>
                            <div className="text-md">
                                Priorities: {priorities}
                            </div>
                        </div>

                        <FlagIcon className="h-10 w-10" />
                    </Link>
                )}
                {can("view any location") && (
                    <Link
                        href={route("location.index")}
                        as="button"
                        className="flex h-fit w-full items-center justify-between rounded-xl border border-gray-300 bg-gray-200 p-4 shadow-lg hover:bg-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                    >
                        <div className="flex flex-col items-start">
                            <div className="text-2xl font-bold">Locations</div>
                            <div className="text-md">
                                Locations: {locations}
                            </div>
                        </div>

                        <MapPinIcon className="h-10 w-10" />
                    </Link>
                )}
            </div>
        </div>
    );
};

Dashboard.layout = (page) => (
    <DashboardLayout children={page} title="Dashboard" />
);

export default Dashboard;
