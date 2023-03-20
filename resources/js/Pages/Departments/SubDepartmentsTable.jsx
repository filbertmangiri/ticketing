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
import CreateModal from "../SubDepartments/Partials/CreateModal";
import DeleteModal from "../SubDepartments/Partials/DeleteModal";
import EditModal from "../SubDepartments/Partials/EditModal";
import RestoreModal from "../SubDepartments/Partials/RestoreModal";
import config from "../SubDepartments/table-config";

const SubDepartmentsTable = ({
    department,
    subDepartmentsResource,
    departments,
}) => {
    const {
        data: subDepartments,
        meta,
        queries,
        queriesBag,
        attributes,
    } = subDepartmentsResource;

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
                route("department.show", department.slug),
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
    const [selectedSubDepartmentToEdit, setSelectedSubDepartmentToEdit] =
        useState({});

    const {
        isOpen: isEditModalOpen,
        open: openEditModal,
        close: closeEditModal,
    } = useModal(false);

    const editHandler = (subDepartment) => {
        setSelectedSubDepartmentToEdit(subDepartment);
        openEditModal();
    };

    /* Delete and Force delete */
    const {
        isOpen: isDeleteModalOpen,
        open: openDeleteModal,
        close: closeDeleteModal,
    } = useModal(false);

    const [selectedSubDepartmentToDelete, setSelectedSubDepartmentToDelete] =
        useState({});

    const deleteHandler = (subDepartment) => {
        setSelectedSubDepartmentToDelete(subDepartment);
        openDeleteModal();
    };

    const confirmDeleteHandler = () => {
        router.delete(
            route(
                `subDepartment.${
                    selectedSubDepartmentToDelete.deleted_at
                        ? "forceDelete"
                        : "destroy"
                }`,
                selectedSubDepartmentToDelete.slug
            ),
            {
                preserveScroll: true,
                onSuccess: () => {
                    closeDeleteModal();
                    Toast(
                        "success",
                        `Sub Department successfully ${
                            selectedSubDepartmentToDelete.deleted_at
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

    const [selectedSubDepartmentToRestore, setSelectedSubDepartmentToRestore] =
        useState({});

    const restoreHandler = (subDepartment) => {
        setSelectedSubDepartmentToRestore(subDepartment);
        openRestoreModal();
    };

    const confirmRestoreHandler = () => {
        router.patch(
            route("subDepartment.restore", selectedSubDepartmentToRestore.slug),
            {},
            {
                preserveScroll: true,
                onSuccess: () => {
                    closeRestoreModal();
                    Toast("success", "Sub Department successfully restored");
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
                            {can("create sub_department") && (
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
                                {subDepartments.length > 0 ? (
                                    subDepartments.map((subDepartment, key) => (
                                        <tr
                                            key={`subDepartment-${key}`}
                                            className="odd:bg-gray-50 dark:odd:bg-gray-700"
                                        >
                                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                                                {subDepartment.id}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                                                {subDepartment.name}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                                                {subDepartment.department
                                                    ?.name || "-"}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                                                {subDepartment.users_count}
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
                                                                    "view sub_department"
                                                                ) && (
                                                                    <Menu.Item
                                                                        as="a"
                                                                        href="#"
                                                                        className="flex w-full items-center rounded-t-lg px-4 py-2 text-left hover:bg-gray-400 dark:hover:bg-gray-600"
                                                                    >
                                                                        <Link
                                                                            href={route(
                                                                                "subDepartment.show",
                                                                                subDepartment.slug
                                                                            )}
                                                                        >
                                                                            <ArrowTopRightOnSquareIcon className="mr-3 h-4 w-4" />
                                                                            View
                                                                        </Link>
                                                                    </Menu.Item>
                                                                )}
                                                                {can(
                                                                    "update sub_department"
                                                                ) && (
                                                                    <Menu.Item
                                                                        as="button"
                                                                        onClick={() => {
                                                                            editHandler(
                                                                                subDepartment
                                                                            );
                                                                        }}
                                                                        className="flex w-full items-center px-4 py-2 text-left hover:bg-gray-400 dark:hover:bg-gray-600"
                                                                    >
                                                                        <PencilSquareIcon className="mr-3 h-4 w-4" />
                                                                        Edit
                                                                    </Menu.Item>
                                                                )}
                                                                {subDepartment.deleted_at &&
                                                                    can(
                                                                        "restore sub_department"
                                                                    ) && (
                                                                        <Menu.Item
                                                                            as="button"
                                                                            onClick={() => {
                                                                                restoreHandler(
                                                                                    subDepartment
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
                                                                        subDepartment.deleted_at
                                                                            ? "force "
                                                                            : ""
                                                                    }delete sub_department`
                                                                ) && (
                                                                    <Menu.Item
                                                                        as="button"
                                                                        onClick={() => {
                                                                            deleteHandler(
                                                                                subDepartment
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
            {can("create sub_department") && (
                <CreateModal
                    isOpen={isCreateModalOpen}
                    close={closeCreateModal}
                    departments={departments}
                    selectedDepartment={department}
                />
            )}

            {can("update sub_department") && (
                <EditModal
                    isOpen={isEditModalOpen}
                    close={closeEditModal}
                    subDepartment={selectedSubDepartmentToEdit}
                    departments={departments}
                />
            )}

            {(can("delete sub_department") ||
                can("force delete sub_department")) && (
                <DeleteModal
                    isOpen={isDeleteModalOpen}
                    close={closeDeleteModal}
                    subDepartment={selectedSubDepartmentToDelete}
                    deleteHandler={confirmDeleteHandler}
                />
            )}

            {can("restore sub_department") && (
                <RestoreModal
                    isOpen={isRestoreModalOpen}
                    close={closeRestoreModal}
                    subDepartment={selectedSubDepartmentToRestore}
                    restoreHandler={confirmRestoreHandler}
                />
            )}
        </>
    );
};

export default SubDepartmentsTable;
