import {
    ChevronDownIcon,
    ChevronUpDownIcon,
    ChevronUpIcon,
} from "@heroicons/react/24/outline";

const SortingHeader = ({
    columns,
    withActionColumn,
    sortDefault,
    params,
    setParams,
}) => {
    const sortHandler = (field) => {
        const [_, direction] = (
            params.sort == "" ? sortDefault : params.sort
        ).split("-");

        setParams({
            ...params,
            sort: `${field}-${direction === "asc" ? "desc" : "asc"}`,
        });
    };

    const [sortField, sortDirection] = (
        params.sort == "" ? sortDefault : params.sort
    ).split("-");

    return (
        <thead className="sticky top-0 bg-gray-200 dark:bg-gray-800">
            <tr>
                {columns.map((column, key) => (
                    <th
                        key={`header-column-${key}`}
                        className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900 dark:text-white"
                    >
                        <div
                            className={`${
                                column.options?.sort ? "cursor-pointer" : ""
                            } ${
                                column.options?.sort &&
                                sortField === column.field
                                    ? "text-blue-500"
                                    : ""
                            }`}
                            onClick={
                                column.options?.sort
                                    ? (e) => sortHandler(column.field)
                                    : null
                            }
                        >
                            {column.label}

                            {column.options?.sort &&
                                (column.field === sortField ? (
                                    sortDirection === "asc" ? (
                                        <ChevronDownIcon className="ml-2 inline h-4 w-4" />
                                    ) : (
                                        <ChevronUpIcon className="ml-2 inline h-4 w-4" />
                                    )
                                ) : (
                                    <ChevronUpDownIcon className="ml-1 inline h-4 w-4" />
                                ))}
                        </div>
                    </th>
                ))}

                {withActionColumn && <th className="px-4 py-2"></th>}
            </tr>
        </thead>
    );
};

export default SortingHeader;
