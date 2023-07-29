import { formatBytes } from "@/Helpers/File";
import {
    ArrowDownTrayIcon,
    DocumentIcon,
    PhotoIcon,
    TrashIcon,
} from "@heroicons/react/24/outline";
import Input from "./Form/Input";

const AttachmentItem = ({
    index,
    attachment,
    deleteHandler = null,
    withDownload = false,
    error,
}) => {
    const isImage = attachment.mime_type.split("/")[0] === "image";

    return (
        <li className="flex h-fit w-40 flex-col gap-y-1">
            <article
                tabIndex="0"
                className={`${
                    isImage
                        ? "group text-transparent hover:text-white"
                        : "dark:bg-gray-700"
                } focus:shadow-outline group relative h-24 w-full rounded-md border border-gray-500 bg-gray-100 shadow-sm focus:outline-none dark:border-gray-500`}
            >
                {isImage && (
                    <img
                        src={attachment.path}
                        alt="preview"
                        className="sticky h-full w-full rounded-md bg-fixed object-cover"
                    />
                )}

                <section
                    className={`${
                        isImage
                            ? "group-hover:bg-gray-900 group-hover:bg-opacity-75"
                            : ""
                    } absolute top-0 flex h-full w-full flex-col break-words rounded-md py-2 px-3 text-xs`}
                >
                    <h1
                        className={`${
                            isImage
                                ? ""
                                : "group-hover:text-blue-800 dark:group-hover:text-blue-400"
                        } flex-1`}
                    >
                        {attachment.name}
                    </h1>
                    <div className="flex justify-between">
                        <div className="flex items-center gap-2">
                            <span>
                                {isImage ? (
                                    <PhotoIcon className="ml-auto h-4 w-4" />
                                ) : (
                                    <DocumentIcon className="ml-auto h-4 w-4" />
                                )}
                            </span>

                            <p className="text-xs">
                                {formatBytes(attachment.size)}
                            </p>
                        </div>

                        <div className="flex items-center gap-2">
                            {deleteHandler && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        deleteHandler(index);
                                    }}
                                    className={`${
                                        isImage
                                            ? "group-hover:text-red-500 hover:group-hover:bg-gray-900 hover:group-hover:bg-opacity-75"
                                            : "text-red-500"
                                    } rounded-md p-1 hover:bg-gray-300 focus:outline-none dark:hover:bg-gray-800`}
                                >
                                    <TrashIcon className="h-4 w-4" />
                                </button>
                            )}

                            {withDownload && (
                                <a
                                    href={route("download", {
                                        path: attachment.storage_path,
                                        filename: attachment.name,
                                    })}
                                    className={`${
                                        isImage
                                            ? "hover:group-hover:bg-gray-900 hover:group-hover:bg-opacity-75"
                                            : ""
                                    } rounded-md p-1 hover:bg-gray-300 focus:outline-none dark:hover:bg-gray-800`}
                                >
                                    <ArrowDownTrayIcon className="h-4 w-4" />
                                </a>
                            )}
                        </div>
                    </div>
                </section>
            </article>

            {error && <Input.Errors errors={error} className="text-xs" />}
        </li>
    );
};

export default AttachmentItem;
