import {
    CheckBadgeIcon,
    ClockIcon,
    LockClosedIcon,
    PencilSquareIcon,
} from "@heroicons/react/20/solid";
import { twMerge } from "tailwind-merge";

const getProgressIcon = (progress) => {
    switch (progress.value) {
        case "created":
            return {
                icon: PencilSquareIcon,
                background: "bg-blue-500",
            };

        case "closed":
            return {
                icon: LockClosedIcon,
                background: "bg-red-500",
            };

        default:
            return {
                icon: ClockIcon,
                background: "bg-yellow-500",
            };
    }
};

function Progresses({ items }) {
    return items?.length > 0 ? (
        <div className="flow-root">
            <ul role="list" className="-mb-8">
                {items.map((item, index) => {
                    const Icon = getProgressIcon(item).icon;

                    return (
                        <li key={index}>
                            <div className="relative pb-8">
                                {index !== items.length - 1 ? (
                                    <span
                                        className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-400 dark:bg-gray-600"
                                        aria-hidden="true"
                                    ></span>
                                ) : null}
                                <div className="relative flex items-center gap-x-6">
                                    <div>
                                        <span
                                            className={twMerge(
                                                getProgressIcon(item)
                                                    .background,
                                                "flex h-10 w-10 items-center justify-center rounded-full ring-8 ring-gray-200 dark:ring-gray-800"
                                            )}
                                        >
                                            <Icon
                                                className="h-5 w-5 text-white"
                                                aria-hidden="true"
                                            />
                                        </span>
                                    </div>
                                    <div className="flex w-full flex-col">
                                        <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                                            <div>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    {item.issuer?.name ||
                                                        item.issuer ||
                                                        "-"}{" "}
                                                    -{" "}
                                                    {item.department?.name ||
                                                        item.department ||
                                                        "-"}
                                                </p>
                                            </div>
                                            <div className="whitespace-nowrap text-right text-sm text-gray-600 dark:text-gray-400">
                                                {item.created_at}
                                            </div>
                                        </div>

                                        <p>{item.description}</p>
                                    </div>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    ) : (
        <div className="flex h-64 items-center justify-center">
            <p className="text-gray-600 dark:text-gray-400">No Progresses</p>
        </div>
    );
}

export default Progresses;
