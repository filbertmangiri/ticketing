import { can } from "@/Helpers/Permission";
import DashboardLayout from "@/Layouts/Dashboard";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import BooksTable from "./BooksTable";
import TicketsTable from "./TicketsTable";

const Index = ({ announcements, tickets, technicians, books }) => {
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
                <TicketsTable tickets={tickets} technicians={technicians} />
            </div>

            <div className="flex flex-col gap-y-3">
                <span className="text-xl font-bold">Books</span>
                <BooksTable books={books} />
            </div>
        </div>
    );
};

Index.layout = (page) => <DashboardLayout children={page} title="Dashboard" />;

export default Index;
