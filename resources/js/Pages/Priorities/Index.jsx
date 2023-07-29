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
import RestoreModal from "./Partials/RestoreModal";
import config from "./table-config";

const Index = ({ ...props }) => {
    const { data: priorities, meta, queries, attributes } = props.priorities;

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
            router.get(route("priority.index"), pickBy(query), {
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
    const [selectedPriorityToEdit, setSelectedPriorityToEdit] = useState({});

    const {
        isOpen: isEditModalOpen,
        open: openEditModal,
        close: closeEditModal,
    } = useModal(false);

    const editHandler = (priority) => {
        setSelectedPriorityToEdit(priority);
        openEditModal();
    };

    /* Delete and Force delete */
    const {
        isOpen: isDeleteModalOpen,
        open: openDeleteModal,
        close: closeDeleteModal,
    } = useModal(false);

    const [selectedPriorityToDelete, setSelectedPriorityToDelete] = useState(
        {}
    );

    const deleteHandler = (priority) => {
        setSelectedPriorityToDelete(priority);
        openDeleteModal();
    };

    const confirmDeleteHandler = () => {
        router.delete(
            route(
                `priority.${
                    selectedPriorityToDelete.deleted_at
                        ? "forceDelete"
                        : "destroy"
                }`,
                selectedPriorityToDelete.slug
            ),
            {
                preserveScroll: true,
                onSuccess: () => {
                    closeDeleteModal();
                    Toast(
                        "success",
                        `Priority successfully ${
                            selectedPriorityToDelete.deleted_at
                                ? "deleted permanently"
                                : "deleted"
                        }`
                    );
                },
            }
        );
    };

    /* Restore */
    const {
        isOpen: isRestoreModalOpen,
        open: openRestoreModal,
        close: closeRestoreModal,
    } = useModal(false);

    const [selectedPriorityToRestore, setSelectedPriorityToRestore] = useState(
        {}
    );

    const restoreHandler = (priority) => {
        setSelectedPriorityToRestore(priority);
        openRestoreModal();
    };

    const confirmRestoreHandler = () => {
        router.patch(
            route("priority.restore", selectedPriorityToRestore.slug),
            {},
            {
                preserveScroll: true,
                onSuccess: () => {
                    closeRestoreModal();
                    Toast("success", "Priority successfully restored");
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
                            {can("create priority") && (
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

                        <div>
                            <Filter params={params} setParams={setParams} />
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
                                {priorities.length > 0 ? (
                                    priorities.map((priority, key) => (
                                        <tr
                                            key={`priority-${key}`}
                                            className="odd:bg-gray-50 dark:odd:bg-gray-700"
                                        >
                                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                                                {priority.id}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                                                {priority.name}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                                                {priority.deadline_days
                                                    ? `${priority.deadline_days} days`
                                                    : "-"}
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
                                                                    "update priority"
                                                                ) && (
                                                                    <Menu.Item
                                                                        as="button"
                                                                        onClick={() => {
                                                                            editHandler(
                                                                                priority
                                                                            );
                                                                        }}
                                                                        className="flex w-full items-center px-4 py-2 text-left hover:bg-gray-400 dark:hover:bg-gray-600"
                                                                    >
                                                                        <PencilSquareIcon className="mr-3 h-4 w-4" />
                                                                        Edit
                                                                    </Menu.Item>
                                                                )}
                                                                {priority.deleted_at &&
                                                                    can(
                                                                        "restore priority"
                                                                    ) && (
                                                                        <Menu.Item
                                                                            as="button"
                                                                            onClick={() => {
                                                                                restoreHandler(
                                                                                    priority
                                                                                );
                                                                            }}
                                                                            className="flex w-full items-center px-4 py-2 text-left hover:bg-gray-400 dark:hover:bg-gray-600"
                                                                        >
                                                                            <ArrowPathIcon className="mr-3 h-4 w-4" />
                                                                            Restore
                                                                        </Menu.Item>
                                                                    )}
                                                            </div>
                                                            <div>
                                                                {can(
                                                                    `${
                                                                        priority.deleted_at
                                                                            ? "force "
                                                                            : ""
                                                                    }delete priority`
                                                                ) && (
                                                                    <Menu.Item
                                                                        as="button"
                                                                        onClick={() => {
                                                                            deleteHandler(
                                                                                priority
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
            {can("create priority") && (
                <CreateModal
                    isOpen={isCreateModalOpen}
                    close={closeCreateModal}
                />
            )}

            {can("update priority") && (
                <EditModal
                    isOpen={isEditModalOpen}
                    close={closeEditModal}
                    priority={selectedPriorityToEdit}
                />
            )}

            {(can("delete priority") || can("force delete priority")) && (
                <DeleteModal
                    isOpen={isDeleteModalOpen}
                    close={closeDeleteModal}
                    priority={selectedPriorityToDelete}
                    deleteHandler={confirmDeleteHandler}
                />
            )}

            {can("restore priority") && (
                <RestoreModal
                    isOpen={isRestoreModalOpen}
                    close={closeRestoreModal}
                    priority={selectedPriorityToRestore}
                    restoreHandler={confirmRestoreHandler}
                />
            )}
        </>
    );
};

Index.layout = (page) => <DashboardLayout children={page} title="Priorities" />;

export default Index;
