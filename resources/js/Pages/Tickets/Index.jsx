import Pagination from "@/Components/Datatable/Pagination";
import PerPage from "@/Components/Datatable/PerPage";
import Search from "@/Components/Datatable/Search";
import SortingHeader from "@/Components/Datatable/SortingHeader";
import { auth } from "@/Helpers/Auth";
import { can } from "@/Helpers/Permission";
import useModal from "@/Hooks/useModal";
import DashboardLayout from "@/Layouts/Dashboard";
import { Menu, Transition } from "@headlessui/react";
import {
    ArrowPathIcon,
    ArrowTopRightOnSquareIcon,
    EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";
import { Link, router } from "@inertiajs/react";
import { debounce, pickBy } from "lodash";
import {
    Fragment,
    useCallback,
    useLayoutEffect,
    useRef,
    useState,
} from "react";
import AssignModal from "./Partials/AssignModal";
import config from "./table-config";

const statusIcon = (ticket) => {
    let color = "fill-gray-500";

    switch (ticket.status?.value) {
        case "submitted":
            color = "fill-gray-500";
            break;
        case "assigned":
            color = "fill-yellow-500";
            break;
        case "on_progress":
            color = "fill-blue-500";
            break;
        default:
            break;
    }

    if (ticket.solved_at) {
        color = "fill-green-500";
    }

    if (ticket.closed_at) {
        color = "fill-black-500";
    }

    return (
        <svg
            className={`${color} h-2 w-2`}
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 31.955 31.955"
            xmlSpace="preserve"
        >
            <g>
                <path
                    d="M27.25,4.655C20.996-1.571,10.88-1.546,4.656,4.706C-1.571,10.96-1.548,21.076,4.705,27.3
    c6.256,6.226,16.374,6.203,22.597-0.051C33.526,20.995,33.505,10.878,27.25,4.655z"
                />
                <path
                    d="M13.288,23.896l-1.768,5.207c2.567,0.829,5.331,0.886,7.926,0.17l-0.665-5.416
    C17.01,24.487,15.067,24.5,13.288,23.896z M8.12,13.122l-5.645-0.859c-0.741,2.666-0.666,5.514,0.225,8.143l5.491-1.375
    C7.452,17.138,7.426,15.029,8.12,13.122z M28.763,11.333l-4.965,1.675c0.798,2.106,0.716,4.468-0.247,6.522l5.351,0.672
    C29.827,17.319,29.78,14.193,28.763,11.333z M11.394,2.883l1.018,5.528c2.027-0.954,4.356-1.05,6.442-0.288l1.583-5.137
    C17.523,1.94,14.328,1.906,11.394,2.883z"
                />
                <circle cx="15.979" cy="15.977" r="6.117" />
            </g>
        </svg>
    );
};

const Index = ({ technicians, ...props }) => {
    const { data: tickets, meta, queries, attributes } = props.tickets;

    /* URL Parameters */
    const [params, setParams] = useState(queries);

    /* Prevent page overload */
    const oldQueries = useRef({
        load: config.defaults.load,
        filter: "",
        q: "",
    });

    const reload = useCallback(
        debounce((query) => {
            /* Prevent page overload */
            if (
                oldQueries.current.load < query.load ||
                oldQueries.current.q !== query.q ||
                oldQueries.current.filter !== query.filter
            ) {
                query.page = 1;
            }

            oldQueries.current.load = query.load;
            oldQueries.current.q = query.q;
            oldQueries.current.filter = query.filter;

            /* Request data based on modified URL parameters */
            router.get(route("ticket.index"), pickBy(query), {
                preserveState: true,
                preserveScroll: true,
            });
        }, 300),
        []
    );

    /* This is just a custom useEffect to prevent the double request when you visit the page */
    const initialMount = useRef(true);

    useLayoutEffect(() => {
        if (initialMount.current) {
            initialMount.current = false;
            return;
        }

        reload(params);
    }, [params]);

    /* Assign */
    const [selectedTicketToAssign, setSelectedTicketToAssign] = useState({});

    const {
        isOpen: isAssignModalOpen,
        open: openAssignModal,
        close: closeAssignModal,
    } = useModal(false);

    const assignHandler = (ticket) => {
        setSelectedTicketToAssign(ticket);
        openAssignModal();
    };

    return (
        <>
            <div className="flex w-full flex-col gap-y-3 rounded-lg border border-gray-300 bg-gray-200 p-4 dark:border-gray-700 dark:bg-gray-800">
                {/* Header */}
                <div className="flex justify-between gap-y-2 max-md:flex-col">
                    <div className="flex gap-y-2 gap-x-5 max-md:flex-col">
                        <PerPage
                            defaultPerPage={config.defaults.load}
                            total={attributes.total}
                            params={params}
                            setParams={setParams}
                        />
                    </div>
                    <div className="flex items-center gap-y-2 gap-x-5 max-md:flex-col">
                        <div>
                            <Search params={params} setParams={setParams} />
                        </div>

                        {/* <div>
                            <Filter params={params} setParams={setParams} />
                        </div> */}
                    </div>
                </div>

                {/* Table */}
                <div className="flex-grow overflow-y-auto">
                    <div className="custom-scrollbar h-full overflow-x-auto">
                        <table className="min-w-full divide-y-2 divide-gray-200 text-sm dark:divide-gray-700">
                            <SortingHeader
                                columns={config.columns}
                                withActionColumn={config.withActionColumn}
                                sortDefault={config.defaults.sort}
                                params={params}
                                setParams={setParams}
                            />

                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {tickets.length > 0 ? (
                                    tickets.map((ticket, key) => (
                                        <tr
                                            key={`ticket-${key}`}
                                            className="odd:bg-gray-50 dark:odd:bg-gray-700"
                                        >
                                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                                                {statusIcon(ticket)}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                                                <Link
                                                    href={route(
                                                        "ticket.show",
                                                        ticket.number
                                                    )}
                                                    className="font-bold text-blue-600 underline dark:text-blue-400"
                                                >
                                                    {ticket.number}
                                                </Link>
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                                                {ticket.closed_at
                                                    ? "Closed"
                                                    : ticket.solved_at
                                                    ? "Solved"
                                                    : ticket.status?.label ||
                                                      "-"}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                                                {ticket.priority?.name ||
                                                    ticket.priority_name ||
                                                    "-"}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                                                {ticket.created_at}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                                                {ticket.deadline_at || "-"}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                                                {ticket.issuer?.name ||
                                                    ticket.issuer_name ||
                                                    "-"}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                                                {ticket.category?.name ||
                                                    ticket.category_name ||
                                                    "-"}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                                                {ticket.product?.name ||
                                                    ticket.product_name ||
                                                    "-"}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                                                {ticket.location?.name ||
                                                    ticket.location_name ||
                                                    "-"}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                                                {ticket.updated_at}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                                                {ticket.technician?.name ||
                                                    ticket.technician_name ||
                                                    "-"}
                                            </td>
                                            <td>
                                                <Menu
                                                    as="div"
                                                    className="relative w-fit"
                                                >
                                                    <Menu.Button>
                                                        <EllipsisVerticalIcon className="h-5 w-5 cursor-pointer" />
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
                                                        <Menu.Items className="absolute right-0 z-10 w-fit divide-y divide-gray-400 rounded-lg border border-gray-300 bg-gray-100 shadow dark:divide-gray-600 dark:border-gray-700 dark:bg-gray-900">
                                                            <div>
                                                                {(can(
                                                                    "view ticket"
                                                                ) ||
                                                                    ticket
                                                                        .issuer
                                                                        ?.id ===
                                                                        auth()
                                                                            .user
                                                                            ?.id) && (
                                                                    <Menu.Item className="flex w-full items-center rounded-t-lg px-4 py-2 text-left hover:bg-gray-400 dark:hover:bg-gray-600">
                                                                        <Link
                                                                            href={route(
                                                                                "ticket.show",
                                                                                ticket.number
                                                                            )}
                                                                        >
                                                                            <ArrowTopRightOnSquareIcon className="mr-3 h-4 w-4" />
                                                                            View
                                                                        </Link>
                                                                    </Menu.Item>
                                                                )}
                                                            </div>
                                                            <div>
                                                                {!ticket.technician &&
                                                                    can(
                                                                        "assign ticket"
                                                                    ) && (
                                                                        <Menu.Item
                                                                            as="button"
                                                                            onClick={() => {
                                                                                assignHandler(
                                                                                    ticket
                                                                                );
                                                                            }}
                                                                            className="flex w-full items-center px-4 py-2 text-left hover:bg-gray-400 dark:hover:bg-gray-600"
                                                                        >
                                                                            <ArrowPathIcon className="mr-3 h-4 w-4" />
                                                                            Assign
                                                                        </Menu.Item>
                                                                    )}
                                                            </div>
                                                        </Menu.Items>
                                                    </Transition>
                                                </Menu>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="4"
                                            className="px-4 py-2 text-center text-gray-700 dark:text-gray-200"
                                        >
                                            No records found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between gap-y-5 max-sm:flex-col">
                    <Pagination
                        meta={meta}
                        params={params}
                        setParams={setParams}
                    />
                </div>
            </div>

            {can("assign ticket") && (
                <AssignModal
                    isOpen={isAssignModalOpen}
                    close={closeAssignModal}
                    ticket={selectedTicketToAssign}
                    technicians={technicians}
                />
            )}
        </>
    );
};

Index.layout = (page) => <DashboardLayout children={page} title="Tickets" />;

export default Index;
