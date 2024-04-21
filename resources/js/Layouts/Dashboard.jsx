import AuthNavbar from "@/Components/Navigation/AuthNavbar";
import Sidebar from "@/Components/Navigation/Sidebar";
import { can } from "@/Helpers/Permission";
import {
    BookOpenIcon,
    BuildingOffice2Icon,
    BuildingOfficeIcon,
    ClipboardDocumentListIcon,
    DevicePhoneMobileIcon,
    FlagIcon,
    MapPinIcon,
    MegaphoneIcon,
    RectangleStackIcon,
    Squares2X2Icon,
    TagIcon,
    TicketIcon,
    UserGroupIcon,
    UsersIcon,
} from "@heroicons/react/24/outline";
import { useRef, useState } from "react";
import AppLayout from "./App";
import { auth } from "@/Helpers/Auth";

const DashboardLayout = ({ title, children }) => {
    const [showSidebar, setShowSidebar] = useState(
        window.innerWidth > 768 ? true : false
    );

    const sidebarToggleRef = useRef(null);

    return (
        <AppLayout title={title}>
            <div className="flex h-screen flex-col">
                <header>
                    <AuthNavbar
                        showSidebar={showSidebar}
                        setShowSidebar={setShowSidebar}
                        sidebarToggleRef={sidebarToggleRef}
                    />
                </header>

                <div className="relative flex flex-grow overflow-hidden">
                    {showSidebar && (
                        <Sidebar
                            showSidebar={showSidebar}
                            setShowSidebar={setShowSidebar}
                            sidebarToggleRef={sidebarToggleRef}
                        >
                            <Sidebar.Item
                                routeName="dashboard"
                                routeCheck="dashboard"
                                icon={<Squares2X2Icon className="h-6 w-6" />}
                                setShowSidebar={setShowSidebar}
                            >
                                Dashboard
                            </Sidebar.Item>
                            {can("create ticket") && (
                                <Sidebar.Item
                                    routeName="ticket.create"
                                    routeCheck="ticket.create"
                                    icon={<TicketIcon className="h-6 w-6" />}
                                    setShowSidebar={setShowSidebar}
                                >
                                    Create a New Ticket
                                </Sidebar.Item>
                            )}
                            <Sidebar.Item
                                routeName="ticket.index"
                                routeCheck={["ticket.index", "ticket.show"]}
                                icon={<TicketIcon className="h-6 w-6" />}
                                setShowSidebar={setShowSidebar}
                            >
                                {can("view any ticket")
                                    ? "Tickets"
                                    : can("view assigned ticket")
                                    ? "Assigned Tickets"
                                    : "My Tickets"}
                            </Sidebar.Item>
                            {(can("create task") ||
                                can("view assigned task")) && (
                                <Sidebar.Item
                                    routeName="task.index"
                                    routeCheck={["task.index", "task.show"]}
                                    icon={
                                        <RectangleStackIcon className="h-6 w-6" />
                                    }
                                    setShowSidebar={setShowSidebar}
                                >
                                    {can("view any task")
                                        ? "Tasks"
                                        : "Assigned Tasks"}
                                </Sidebar.Item>
                            )}
                            {(can("view any calibration") ||
                                auth().user.sub_department_id) && (
                                <Sidebar.Item
                                    routeName="calibration.index"
                                    routeCheck="calibration.*"
                                    icon={
                                        <ClipboardDocumentListIcon className="h-6 w-6" />
                                    }
                                    setShowSidebar={setShowSidebar}
                                >
                                    {can("view any calibration")
                                        ? "Calibrations"
                                        : "Assigned Calibrations"}
                                </Sidebar.Item>
                            )}
                            {can("view any user") && (
                                <Sidebar.Item
                                    routeName="user.index"
                                    routeCheck="user.*"
                                    icon={<UsersIcon className="h-6 w-6" />}
                                    setShowSidebar={setShowSidebar}
                                >
                                    Users
                                </Sidebar.Item>
                            )}
                            {can("view any department") && (
                                <Sidebar.Item
                                    routeName="department.index"
                                    routeCheck="department.*"
                                    icon={
                                        <BuildingOffice2Icon className="h-6 w-6" />
                                    }
                                    setShowSidebar={setShowSidebar}
                                >
                                    Departments
                                </Sidebar.Item>
                            )}
                            {can("view any sub_department") && (
                                <Sidebar.Item
                                    routeName="subDepartment.index"
                                    routeCheck="subDepartment.*"
                                    icon={
                                        <BuildingOfficeIcon className="h-6 w-6" />
                                    }
                                    setShowSidebar={setShowSidebar}
                                >
                                    Sub Departments
                                </Sidebar.Item>
                            )}
                            {can("view any category") && (
                                <Sidebar.Item
                                    routeName="category.index"
                                    routeCheck="category.*"
                                    icon={<TagIcon className="h-6 w-6" />}
                                    setShowSidebar={setShowSidebar}
                                >
                                    Categories
                                </Sidebar.Item>
                            )}
                            {can("view any product") && (
                                <Sidebar.Item
                                    routeName="product.index"
                                    routeCheck="product.*"
                                    icon={
                                        <DevicePhoneMobileIcon className="h-6 w-6" />
                                    }
                                    setShowSidebar={setShowSidebar}
                                >
                                    Products
                                </Sidebar.Item>
                            )}
                            {can("view any priority") && (
                                <Sidebar.Item
                                    routeName="priority.index"
                                    routeCheck="priority.*"
                                    icon={<FlagIcon className="h-6 w-6" />}
                                    setShowSidebar={setShowSidebar}
                                >
                                    Priorities
                                </Sidebar.Item>
                            )}
                            {can("view any location") && (
                                <Sidebar.Item
                                    routeName="location.index"
                                    routeCheck="location.*"
                                    icon={<MapPinIcon className="h-6 w-6" />}
                                    setShowSidebar={setShowSidebar}
                                >
                                    Locations
                                </Sidebar.Item>
                            )}
                            {can("view any announcement") && (
                                <Sidebar.Item
                                    routeName="announcement.index"
                                    routeCheck="announcement.*"
                                    icon={<MegaphoneIcon className="h-6 w-6" />}
                                    setShowSidebar={setShowSidebar}
                                >
                                    Announcements
                                </Sidebar.Item>
                            )}
                            <Sidebar.Item
                                routeName="book.index"
                                routeCheck="book.*"
                                icon={<BookOpenIcon className="h-6 w-6" />}
                                setShowSidebar={setShowSidebar}
                            >
                                Knowledge Base
                            </Sidebar.Item>
                        </Sidebar>
                    )}

                    <main
                        className={`${
                            !showSidebar && "md:px-responsive"
                        } custom-scrollbar flex flex-grow overflow-auto px-5 py-5`}
                    >
                        {children}
                    </main>
                </div>
            </div>
        </AppLayout>
    );
};

export default DashboardLayout;
