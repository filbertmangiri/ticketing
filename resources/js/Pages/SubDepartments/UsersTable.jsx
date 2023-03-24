import Filter from "@/Components/Datatable/Filter";
import Pagination from "@/Components/Datatable/Pagination";
import PerPage from "@/Components/Datatable/PerPage";
import Search from "@/Components/Datatable/Search";
import SortingHeader from "@/Components/Datatable/SortingHeader";
import { can } from "@/Helpers/Permission";
import { Toast } from "@/Helpers/Toast";
import useModal from "@/Hooks/useModal";
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
import CreateModal from "../Users/Partials/CreateModal";
import DeleteModal from "../Users/Partials/DeleteModal";
import EditModal from "../Users/Partials/EditModal";
import RestoreModal from "../Users/Partials/RestoreModal";
import config from "../Users/table-config";

const UsersTable = ({ subDepartment, usersResource, departments, roles }) => {
    const {
        data: users,
        meta,
        queries,
        queriesBag,
        attributes,
    } = usersResource;

    /* URL Parameters */
    const [params, setParams] = useState(() => {
        const newQueries = {};

        Object.keys(queries).forEach((key) => {
            newQueries[key.replace(queriesBag + ".", "")] = queries[key];
        });

        return newQueries;
    });

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

            Object.keys(query).forEach(function (key) {
                query[queriesBag + "." + key] = query[key];
            });

            /* Request data based on modified URL parameters */
            router.post(
                route("subDepartment.show", subDepartment.slug),
                pickBy(query),
                {
                    preserveState: true,
                    preserveScroll: true,
                }
            );
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
    const [selectedUserToEdit, setSelectedUserToEdit] = useState({});

    const {
        isOpen: isEditModalOpen,
        open: openEditModal,
        close: closeEditModal,
    } = useModal(false);

    const editHandler = (user) => {
        setSelectedUserToEdit(user);
        openEditModal();
    };

    /* Delete and Force delete */
    const {
        isOpen: isDeleteModalOpen,
        open: openDeleteModal,
        close: closeDeleteModal,
    } = useModal(false);

    const [selectedUserToDelete, setSelectedUserToDelete] = useState({});

    const deleteHandler = (user) => {
        setSelectedUserToDelete(user);
        openDeleteModal();
    };

    const confirmDeleteHandler = () => {
        router.delete(
            route(
                `user.${
                    selectedUserToDelete.deleted_at ? "forceDelete" : "destroy"
                }`,
                selectedUserToDelete.username
            ),
            {
                preserveScroll: true,
                onSuccess: () => {
                    closeDeleteModal();
                    Toast(
                        "success",
                        `User successfully ${
                            selectedUserToDelete.deleted_at
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

    const [selectedUserToRestore, setSelectedUserToRestore] = useState({});

    const restoreHandler = (user) => {
        setSelectedUserToRestore(user);
        openRestoreModal();
    };

    const confirmRestoreHandler = () => {
        router.patch(
            route("user.restore", selectedUserToRestore.username),
            {},
            {
                preserveScroll: true,
                onSuccess: () => {
                    closeRestoreModal();
                    Toast("success", "User successfully restored");
                },
            }
        );
    };

    return (
        <>
            <div className="flex h-full flex-col gap-y-3">
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
                            {can("create user") && (
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
                                {users.length > 0 ? (
                                    users.map((user, key) => (
                                        <tr
                                            key={`user-${key}`}
                                            className="odd:bg-gray-50 dark:odd:bg-gray-700"
                                        >
                                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                                                {user.id}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                                                {user.name}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
                                                {user.email}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
                                                {user.username}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
                                                {user.phone || "-"}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
                                                {user.gender.label}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
                                                {user.department?.name ? (
                                                    <Link
                                                        href={route(
                                                            "department.show",
                                                            user.department.slug
                                                        )}
                                                    >
                                                        {user.department.name}
                                                    </Link>
                                                ) : (
                                                    "-"
                                                )}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
                                                {user.sub_department?.name ||
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
                                                                {can(
                                                                    "view user"
                                                                ) && (
                                                                    <Menu.Item className="flex w-full items-center rounded-t-lg px-4 py-2 text-left hover:bg-gray-400 dark:hover:bg-gray-600">
                                                                        <Link
                                                                            href={route(
                                                                                "user.show",
                                                                                user.username
                                                                            )}
                                                                        >
                                                                            <ArrowTopRightOnSquareIcon className="mr-3 h-4 w-4" />
                                                                            View
                                                                        </Link>
                                                                    </Menu.Item>
                                                                )}
                                                                {can(
                                                                    "update user"
                                                                ) && (
                                                                    <Menu.Item
                                                                        as="button"
                                                                        onClick={() => {
                                                                            editHandler(
                                                                                user
                                                                            );
                                                                        }}
                                                                        className="flex w-full items-center px-4 py-2 text-left hover:bg-gray-400 dark:hover:bg-gray-600"
                                                                    >
                                                                        <PencilSquareIcon className="mr-3 h-4 w-4" />
                                                                        Edit
                                                                    </Menu.Item>
                                                                )}
                                                                {user.deleted_at &&
                                                                    can(
                                                                        "restore user"
                                                                    ) && (
                                                                        <Menu.Item
                                                                            as="button"
                                                                            onClick={() => {
                                                                                restoreHandler(
                                                                                    user
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
                                                                        user.deleted_at
                                                                            ? "force "
                                                                            : ""
                                                                    }delete user`
                                                                ) && (
                                                                    <Menu.Item
                                                                        as="button"
                                                                        onClick={() => {
                                                                            deleteHandler(
                                                                                user
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
            {can("create user") && (
                <CreateModal
                    isOpen={isCreateModalOpen}
                    close={closeCreateModal}
                    departments={departments}
                    selectedDepartment={subDepartment.department}
                    selectedSubDepartment={subDepartment}
                    roles={roles}
                />
            )}

            {can("update user") && (
                <EditModal
                    isOpen={isEditModalOpen}
                    close={closeEditModal}
                    user={selectedUserToEdit}
                    departments={departments}
                    roles={roles}
                />
            )}

            {(can("delete user") || can("force delete user")) && (
                <DeleteModal
                    isOpen={isDeleteModalOpen}
                    close={closeDeleteModal}
                    user={selectedUserToDelete}
                    deleteHandler={confirmDeleteHandler}
                />
            )}

            {can("restore user") && (
                <RestoreModal
                    isOpen={isRestoreModalOpen}
                    close={closeRestoreModal}
                    user={selectedUserToRestore}
                    restoreHandler={confirmRestoreHandler}
                />
            )}
        </>
    );
};

export default UsersTable;
