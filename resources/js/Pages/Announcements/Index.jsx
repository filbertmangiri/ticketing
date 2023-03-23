import Filter from "@/Components/Datatable/Filter";
import Pagination from "@/Components/Datatable/Pagination";
import PerPage from "@/Components/Datatable/PerPage";
import Search from "@/Components/Datatable/Search";
import SortingHeader from "@/Components/Datatable/SortingHeader";
import { can } from "@/Helpers/Permission";
import { Toast } from "@/Helpers/Toast";
import useModal from "@/Hooks/useModal";
import DashboardLayout from "@/Layouts/Dashboard";
import { Menu, Transition } from "@headlessui/react";
import {
    ArrowPathIcon,
    ArrowTopRightOnSquareIcon,
    EllipsisVerticalIcon,
    PencilSquareIcon,
    TrashIcon,
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
import CreateModal from "./Partials/CreateModal";
import DeleteModal from "./Partials/DeleteModal";
import EditModal from "./Partials/EditModal";
import config from "./table-config";

const Index = ({ ...props }) => {
    const {
        data: announcements,
        meta,
        queries,
        attributes,
    } = props.announcements;

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
            router.get(route("announcement.index"), pickBy(query), {
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

    /* Create */
    const {
        isOpen: isCreateModalOpen,
        open: openCreateModal,
        close: closeCreateModal,
    } = useModal(false);

    /* Edit */
    const [selectedAnnouncementToEdit, setSelectedAnnouncementToEdit] =
        useState({});

    const {
        isOpen: isEditModalOpen,
        open: openEditModal,
        close: closeEditModal,
    } = useModal(false);

    const editHandler = (announcement) => {
        setSelectedAnnouncementToEdit(announcement);
        openEditModal();
    };

    /* Delete */
    const {
        isOpen: isDeleteModalOpen,
        open: openDeleteModal,
        close: closeDeleteModal,
    } = useModal(false);

    const [selectedAnnouncementToDelete, setSelectedAnnouncementToDelete] =
        useState({});

    const deleteHandler = (announcement) => {
        setSelectedAnnouncementToDelete(announcement);
        openDeleteModal();
    };

    const confirmDeleteHandler = () => {
        router.delete(
            route("announcement.destroy", selectedAnnouncementToDelete.id),
            {
                preserveScroll: true,
                onSuccess: () => {
                    closeDeleteModal();
                    Toast(
                        "success",
                        `Announcement successfully ${
                            selectedAnnouncementToDelete.deleted_at
                                ? "deleted permanently"
                                : "deleted"
                        }`
                    );
                },
            }
        );
    };

    return (
        <>
            <div className="flex w-full flex-col gap-y-3 rounded-lg border border-gray-300 bg-gray-200 p-4 dark:border-gray-700 dark:bg-gray-800">
                {/* Header */}
                <div className="flex justify-between gap-y-2 max-md:flex-col">
                    <div className="flex gap-y-2 gap-x-5 max-md:flex-col">
                        <div>
                            <PerPage
                                defaultPerPage={config.defaults.load}
                                total={attributes.total}
                                params={params}
                                setParams={setParams}
                            />
                        </div>
                        <div>
                            {can("create announcement") && (
                                <button
                                    type="button"
                                    onClick={openCreateModal}
                                    className="rounded-md bg-green-700 px-3.5 py-1.5 text-sm font-medium text-white transition hover:bg-opacity-75 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                                >
                                    Create
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center gap-y-2 gap-x-5 max-md:flex-col">
                        <div>
                            <Search params={params} setParams={setParams} />
                        </div>
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
                                {announcements.length > 0 ? (
                                    announcements.map((announcement, key) => (
                                        <tr
                                            key={`announcement-${key}`}
                                            className="odd:bg-gray-50 dark:odd:bg-gray-700"
                                        >
                                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                                                {announcement.id}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                                                {announcement.title}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                                                <Link
                                                    href={route(
                                                        "user.show",
                                                        announcement.author
                                                            ?.username
                                                    )}
                                                >
                                                    {announcement.author?.name}
                                                </Link>
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
                                                                {can(
                                                                    "view announcement"
                                                                ) && (
                                                                    <Menu.Item
                                                                        as="a"
                                                                        href="#"
                                                                        className="flex w-full items-center rounded-t-lg px-4 py-2 text-left hover:bg-gray-400 dark:hover:bg-gray-600"
                                                                    >
                                                                        <ArrowTopRightOnSquareIcon className="mr-3 h-4 w-4" />
                                                                        View
                                                                    </Menu.Item>
                                                                )}
                                                                {can(
                                                                    "update announcement"
                                                                ) && (
                                                                    <Menu.Item
                                                                        as="button"
                                                                        onClick={() => {
                                                                            editHandler(
                                                                                announcement
                                                                            );
                                                                        }}
                                                                        className="flex w-full items-center px-4 py-2 text-left hover:bg-gray-400 dark:hover:bg-gray-600"
                                                                    >
                                                                        <PencilSquareIcon className="mr-3 h-4 w-4" />
                                                                        Edit
                                                                    </Menu.Item>
                                                                )}
                                                            </div>
                                                            <div>
                                                                {can(
                                                                    "delete announcement"
                                                                ) && (
                                                                    <Menu.Item
                                                                        as="button"
                                                                        onClick={() => {
                                                                            deleteHandler(
                                                                                announcement
                                                                            );
                                                                        }}
                                                                        className="flex w-full items-center rounded-b-lg px-4 py-2 text-left text-red-500 hover:bg-gray-400 dark:hover:bg-gray-600"
                                                                    >
                                                                        <TrashIcon className="mr-3 h-4 w-4" />
                                                                        Delete
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

            {/* CRUD Modals */}
            {can("create announcement") && (
                <CreateModal
                    isOpen={isCreateModalOpen}
                    close={closeCreateModal}
                />
            )}

            {can("update announcement") && (
                <EditModal
                    isOpen={isEditModalOpen}
                    close={closeEditModal}
                    announcement={selectedAnnouncementToEdit}
                />
            )}

            {can("delete announcement") && (
                <DeleteModal
                    isOpen={isDeleteModalOpen}
                    close={closeDeleteModal}
                    announcement={selectedAnnouncementToDelete}
                    deleteHandler={confirmDeleteHandler}
                />
            )}
        </>
    );
};

Index.layout = (page) => (
    <DashboardLayout children={page} title="Announcements" />
);

export default Index;
