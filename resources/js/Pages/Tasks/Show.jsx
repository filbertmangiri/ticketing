import AttachmentItem from "@/Components/AttachmentItem";
import Editor from "@/Components/Form/Editor";
import Input from "@/Components/Form/Input";
import { can } from "@/Helpers/Permission";
import { Toast } from "@/Helpers/Toast";
import useModal from "@/Hooks/useModal";
import DashboardLayout from "@/Layouts/Dashboard";
import { Tab } from "@headlessui/react";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import { Link, useForm } from "@inertiajs/react";
import "ckeditor-tailwind-reset/ckeditor-tailwind-reset.css";
import { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { twMerge } from "tailwind-merge";
import DeleteCommentModal from "./Comment/DeleteModal";
import EditCommentModal from "./Comment/EditModal";
import CommentItem from "./Comment/Item";
import ReplyCommentModal from "./Comment/ReplyModal";
import CloseModal from "./Partials/CloseModal";
import CreateProgressModal from "./Partials/CreateProgressModal";
import EditModal from "./Partials/EditModal";
import Progresses from "./Partials/Progresses";
import ReopenModal from "./Partials/ReopenModal";
import SolvedModal from "./Partials/SolvedModal";

const Show = ({ comments, ...props }) => {
    const { data: task } = props.task;

    const commentForm = useForm({
        task_id: task.id,
        body: "",
        attachments: [],
    });

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

    const commentSubmitHandler = (e) => {
        e.preventDefault();

        commentForm.post(route("task_comment.store"), {
            preserveScroll: true,

            onSuccess: () => {
                // commentForm.reset();

                commentForm.setData({
                    body: "",
                    attachments: [],
                });

                commentForm.clearErrors();

                Toast("success", "Comment successfully added");
            },
        });
    };

    const firstUpdate = useRef(true);

    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }

        commentForm.setData("attachments", [
            ...commentForm.data.attachments,
            ...acceptedFiles,
        ]);
    }, [acceptedFiles]);

    const deleteAttachmentHandler = (index) => {
        commentForm.setData(
            "attachments",
            commentForm.data.attachments.filter(function (_, arrIndex) {
                return index !== arrIndex;
            })
        );
    };

    /* Edit */
    const editModal = useModal(false);

    /* Close */
    const closeModal = useModal(false);

    /* Re-open */
    const reopenModal = useModal(false);

    /* Solved */
    const solvedModal = useModal(false);

    /* Progress */
    const progressModal = useModal(false);

    /* Comment CRUD */
    const [selectedComment, setSelectedComment] = useState(null);

    /* Reply */
    const replyCommentModal = useModal(false);

    /* Edit */
    const editCommentModal = useModal(false);

    /* Delete */
    const deleteCommentModal = useModal(false);

    return (
        <Tab.Group as="div" className="flex h-full w-full flex-col gap-y-2">
            <Tab.List className="flex space-x-1 rounded-xl bg-gray-200 p-1 dark:bg-gray-800">
                <Tab
                    className={({ selected }) =>
                        twMerge(
                            "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                            "ring-gray-100 ring-opacity-60 ring-offset-2 focus:outline-none dark:ring-gray-900",
                            selected
                                ? "bg-gray-100 shadow dark:bg-gray-900"
                                : "text-gray-600 hover:bg-gray-100/[0.50] dark:text-gray-400 dark:hover:bg-gray-900/[0.50]"
                        )
                    }
                >
                    Details
                </Tab>
                <Tab
                    className={({ selected }) =>
                        twMerge(
                            "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                            "ring-gray-100 ring-opacity-60 ring-offset-2 focus:outline-none dark:ring-gray-900",
                            selected
                                ? "bg-gray-100 shadow dark:bg-gray-900"
                                : "text-gray-600 hover:bg-gray-100/[0.50] dark:text-gray-400 dark:hover:bg-gray-900/[0.50]"
                        )
                    }
                >
                    Progress
                </Tab>
            </Tab.List>

            <Tab.Panels className="flex-grow">
                <Tab.Panel className="h-fit max-h-full rounded-lg border border-gray-300 bg-gray-200 p-4 dark:border-gray-700 dark:bg-gray-800">
                    <div className="flex gap-5 max-md:flex-col">
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col gap-2">
                                <ul className="flex max-w-xs flex-col">
                                    <li className="-mt-px inline-flex items-center gap-x-2 border bg-white py-3 px-4 text-sm font-medium text-gray-800 first:mt-0 first:rounded-t-lg last:rounded-b-lg odd:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:odd:bg-slate-800 md:flex-col">
                                        <div className="w-full whitespace-nowrap font-extrabold">
                                            Task Number :
                                        </div>
                                        <div className="w-full font-extralight max-md:text-right">
                                            {task.number}
                                        </div>
                                    </li>
                                    <li className="-mt-px inline-flex items-center gap-x-2 border bg-white py-3 px-4 text-sm font-medium text-gray-800 first:mt-0 first:rounded-t-lg last:rounded-b-lg odd:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:odd:bg-slate-800 md:flex-col">
                                        <div className="w-full whitespace-nowrap font-extrabold">
                                            Submitted at :
                                        </div>
                                        <div className="w-full font-extralight max-md:text-right">
                                            {task.created_at}
                                        </div>
                                    </li>
                                    <li className="-mt-px inline-flex items-center gap-x-2 border bg-white py-3 px-4 text-sm font-medium text-gray-800 first:mt-0 first:rounded-t-lg last:rounded-b-lg odd:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:odd:bg-slate-800 md:flex-col">
                                        <div className="w-full whitespace-nowrap font-extrabold">
                                            Status :
                                        </div>
                                        <div className="w-full font-extralight max-md:text-right">
                                            {task.closed_at
                                                ? "Closed"
                                                : task.solved_at
                                                ? "Approved"
                                                : task.status?.label || "-"}
                                        </div>
                                    </li>
                                    <li className="-mt-px inline-flex items-center gap-x-2 border bg-white py-3 px-4 text-sm font-medium text-gray-800 first:mt-0 first:rounded-t-lg last:rounded-b-lg odd:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:odd:bg-slate-800 md:flex-col">
                                        <div className="w-full whitespace-nowrap font-extrabold">
                                            Last updated :
                                        </div>
                                        <div className="w-full font-extralight max-md:text-right">
                                            {task.updated_at || "-"}
                                        </div>
                                    </li>
                                    {task.technician && (
                                        <li className="-mt-px inline-flex items-center gap-x-2 border bg-white py-3 px-4 text-sm font-medium text-gray-800 first:mt-0 first:rounded-t-lg last:rounded-b-lg odd:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:odd:bg-slate-800 md:flex-col">
                                            <div className="w-full whitespace-nowrap font-extrabold">
                                                Technician :
                                            </div>
                                            <div className="w-full font-extralight max-md:text-right">
                                                {task.technician?.id ? (
                                                    <Link
                                                        href={route(
                                                            "user.show",
                                                            task.technician
                                                                ?.username
                                                        )}
                                                    >
                                                        {task.technician?.name}
                                                    </Link>
                                                ) : (
                                                    task.technician || "-"
                                                )}
                                            </div>
                                        </li>
                                    )}
                                </ul>
                            </div>

                            <div className="flex flex-col gap-2">
                                <span className="text-xl font-extrabold">
                                    Administrator
                                </span>

                                <ul className="flex max-w-xs flex-col">
                                    <li className="-mt-px inline-flex items-center gap-x-2 border bg-white py-3 px-4 text-sm font-medium text-gray-800 first:mt-0 first:rounded-t-lg last:rounded-b-lg odd:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:odd:bg-slate-800 md:flex-col">
                                        <div className="w-full whitespace-nowrap font-extrabold">
                                            Name :
                                        </div>
                                        <div className="w-full font-extralight max-md:text-right">
                                            {task.issuer ? (
                                                <Link
                                                    href={route(
                                                        "user.show",
                                                        task.issuer?.username
                                                    )}
                                                >
                                                    {task.issuer?.name}
                                                </Link>
                                            ) : (
                                                task.issuer_name || "-"
                                            )}
                                        </div>
                                    </li>
                                    <li className="-mt-px inline-flex items-center gap-x-2 border bg-white py-3 px-4 text-sm font-medium text-gray-800 first:mt-0 first:rounded-t-lg last:rounded-b-lg odd:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:odd:bg-slate-800 md:flex-col">
                                        <div className="w-full whitespace-nowrap font-extrabold">
                                            Department :
                                        </div>
                                        <div className="w-full font-extralight max-md:text-right">
                                            {task.department ? (
                                                <Link
                                                    href={route(
                                                        "department.show",
                                                        task.department?.slug
                                                    )}
                                                >
                                                    {task.department?.name}
                                                </Link>
                                            ) : (
                                                "-"
                                            )}
                                        </div>
                                    </li>
                                    <li className="-mt-px inline-flex items-center gap-x-2 border bg-white py-3 px-4 text-sm font-medium text-gray-800 first:mt-0 first:rounded-t-lg last:rounded-b-lg odd:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:odd:bg-slate-800 md:flex-col">
                                        <div className="w-full whitespace-nowrap font-extrabold">
                                            Sub Department :
                                        </div>
                                        <div className="w-full font-extralight max-md:text-right">
                                            {task.sub_department ? (
                                                <Link
                                                    href={route(
                                                        "subDepartment.show",
                                                        task.sub_department
                                                            ?.slug
                                                    )}
                                                >
                                                    {task.sub_department?.name}
                                                </Link>
                                            ) : (
                                                "-"
                                            )}
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="flex flex-grow flex-col gap-y-5">
                            <ul className="flex flex-col">
                                <li className="-mt-px inline-flex flex-col items-center gap-x-2 border bg-white py-3 px-4 text-sm font-medium text-gray-800 first:mt-0 first:rounded-t-lg last:rounded-b-lg odd:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:odd:bg-slate-800">
                                    <div className="w-full whitespace-nowrap font-extrabold">
                                        Subject :
                                    </div>
                                    <div className="mt-2 w-full font-extralight md:pl-4">
                                        {task.closed_at ? (
                                            <span className="mr-2 font-extrabold text-red-500">
                                                [CLOSED]
                                            </span>
                                        ) : (
                                            ""
                                        )}
                                        {task.title}
                                    </div>
                                </li>
                                <li className="-mt-px inline-flex flex-col items-center gap-x-2 border bg-white py-3 px-4 text-sm font-medium text-gray-800 first:mt-0 first:rounded-t-lg last:rounded-b-lg odd:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:odd:bg-slate-800">
                                    <div className="w-full whitespace-nowrap font-extrabold">
                                        Description :
                                    </div>
                                    <div
                                        className="ck-content mt-2 w-full border-gray-300 font-extralight dark:border-gray-700 md:p-4"
                                        dangerouslySetInnerHTML={{
                                            __html: task.body,
                                        }}
                                    />
                                </li>
                                <li className="-mt-px inline-flex flex-col items-center gap-x-2 border bg-white py-3 px-4 text-sm font-medium text-gray-800 first:mt-0 first:rounded-t-lg last:rounded-b-lg odd:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:odd:bg-slate-800">
                                    <div className="w-full whitespace-nowrap font-extrabold">
                                        Attachments :
                                    </div>
                                    <ul className="mt-2 flex w-full flex-1 flex-wrap gap-2">
                                        {task.attachments.length > 0 ? (
                                            task.attachments.map(
                                                (attachment) => (
                                                    <AttachmentItem
                                                        key={`attachment-${attachment.id}`}
                                                        attachment={attachment}
                                                        withDownload={true}
                                                    />
                                                )
                                            )
                                        ) : (
                                            <div className="mt-2 w-full font-extralight md:pl-4">
                                                No files attached
                                            </div>
                                        )}
                                    </ul>
                                </li>
                            </ul>

                            <div className="flex justify-between">
                                <div className="flex gap-2">
                                    {task.can.update && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                editModal.open();
                                            }}
                                            className="inline-flex justify-center rounded-md border border-transparent bg-yellow-500 py-2 px-4 text-sm font-medium text-white shadow-sm transition hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 dark:bg-yellow-600 dark:hover:bg-yellow-700 sm:w-fit"
                                        >
                                            Edit
                                        </button>
                                    )}

                                    {!task.closed_at && can("close task") && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                closeModal.open();
                                            }}
                                            className="inline-flex justify-center rounded-md border border-transparent bg-red-500 py-2 px-4 text-sm font-medium text-white shadow-sm transition hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:bg-red-600 dark:hover:bg-red-700 sm:w-fit"
                                        >
                                            Close
                                        </button>
                                    )}

                                    {task.closed_at && can("close task") && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                reopenModal.open();
                                            }}
                                            className="inline-flex justify-center rounded-md border border-transparent bg-green-500 py-2 px-4 text-sm font-medium text-white shadow-sm transition hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:bg-green-600 dark:hover:bg-green-700 sm:w-fit"
                                        >
                                            Re-open
                                        </button>
                                    )}
                                </div>

                                <div className="flex gap-2">
                                    {task.can.solved && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                solvedModal.open();
                                            }}
                                            className="inline-flex justify-center rounded-md border border-transparent bg-green-700 py-2 px-4 text-sm font-medium text-white shadow-sm transition hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:w-fit"
                                        >
                                            Approve
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-col gap-y-2">
                                <div className="flex justify-between">
                                    <span className="text-xl font-extrabold">
                                        Progress
                                    </span>

                                    {task.can.create_progress && (
                                        <button
                                            type="button"
                                            onClick={progressModal.open}
                                            className="inline-flex justify-center rounded-md border border-transparent bg-green-700 py-1.5 px-3 text-sm font-medium text-white shadow-sm transition hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:w-fit"
                                        >
                                            Update
                                        </button>
                                    )}
                                </div>
                                <div className="flex h-4 w-full overflow-hidden rounded-full bg-gray-300 dark:bg-gray-700">
                                    <div
                                        className="flex flex-col justify-center overflow-hidden bg-blue-500 text-center text-xs text-white"
                                        role="progressbar"
                                        style={{
                                            width: `${task.progress}%`,
                                        }}
                                        aria-valuenow={task.progress}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                    >
                                        {task.progress}%
                                    </div>
                                </div>
                            </div>

                            {task.solved_at && (
                                <div className="flex items-center justify-between rounded-lg bg-green-600 px-5 py-3 text-white dark:bg-green-700">
                                    <div className="flex gap-2">
                                        <CheckBadgeIcon className="h-6 w-6 stroke-2" />
                                        <span className="font-semibold">
                                            Approved
                                        </span>
                                    </div>

                                    <span className="text-sm">
                                        {task.solved_at}
                                    </span>
                                </div>
                            )}

                            <div className="flex flex-col gap-y-8">
                                <div className="flex flex-col gap-y-2">
                                    <span className="text-xl font-extrabold">
                                        Comments
                                    </span>

                                    {(!task.closed_at ||
                                        can("action closed task")) && (
                                        <form
                                            onSubmit={commentSubmitHandler}
                                            className="flex flex-col gap-y-3"
                                        >
                                            <div>
                                                {/* <TextArea.Field
                                                    className="bg-gray-100 dark:bg-gray-800"
                                                    placeholder="Add your comment . . ."
                                                    value={
                                                        commentForm.data.body
                                                    }
                                                    onChange={(e) =>
                                                        commentForm.setData(
                                                            "body",
                                                            e.target.value
                                                        )
                                                    }
                                                /> */}

                                                <Editor
                                                    data={commentForm.data.body}
                                                    setData={
                                                        commentForm.setData
                                                    }
                                                    config={{
                                                        placeholder:
                                                            "Add your comment . . .",
                                                    }}
                                                />

                                                <Input.Errors
                                                    errors={
                                                        commentForm.errors.body
                                                    }
                                                />
                                            </div>

                                            <section className="container">
                                                <div
                                                    {...getRootProps({
                                                        className:
                                                            "dropzone relative cursor-pointer rounded-lg border border-dashed border-gray-500 transition-colors hover:border-blue-600 dark:hover:border-blue-400",
                                                    })}
                                                >
                                                    <input
                                                        {...getInputProps({
                                                            className:
                                                                "relative block h-full w-full cursor-pointer p-20 opacity-0",
                                                        })}
                                                    />
                                                    <p className="m-auto p-10 text-center">
                                                        Drag 'n' drop some files
                                                        here, or click to select
                                                        files
                                                    </p>
                                                </div>
                                                <ul className="mt-4 flex w-full flex-1 flex-wrap gap-2">
                                                    {commentForm.data
                                                        .attachments?.length >
                                                    0 ? (
                                                        commentForm.data.attachments.map(
                                                            (
                                                                attachment,
                                                                index
                                                            ) => {
                                                                const file = {
                                                                    path: URL.createObjectURL(
                                                                        attachment
                                                                    ),
                                                                    name: attachment.name,
                                                                    size: attachment.size,
                                                                    mime_type:
                                                                        attachment.type,
                                                                };

                                                                return (
                                                                    <AttachmentItem
                                                                        key={`attachment-${index}`}
                                                                        index={
                                                                            index
                                                                        }
                                                                        attachment={
                                                                            file
                                                                        }
                                                                        deleteHandler={
                                                                            deleteAttachmentHandler
                                                                        }
                                                                        error={
                                                                            commentForm
                                                                                .errors[
                                                                                "attachments." +
                                                                                    index
                                                                            ]
                                                                        }
                                                                    />
                                                                );
                                                            }
                                                        )
                                                    ) : (
                                                        <li className="flex h-full w-full flex-col items-center justify-center text-center">
                                                            <span className="text-small text-gray-500">
                                                                No files
                                                                selected
                                                            </span>
                                                        </li>
                                                    )}
                                                </ul>
                                            </section>

                                            <div className="flex gap-x-2">
                                                <button
                                                    type="button"
                                                    onClick={
                                                        commentSubmitHandler
                                                    }
                                                    disabled={
                                                        commentForm.processing
                                                    }
                                                    className={`${
                                                        commentForm.processing &&
                                                        "cursor-wait"
                                                    } inline-flex justify-center rounded-md border border-transparent bg-green-700 py-2 px-4 text-sm font-medium text-white shadow-sm transition hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:w-fit`}
                                                >
                                                    {commentForm.processing
                                                        ? "..."
                                                        : "Create"}
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        commentForm.reset();
                                                        commentForm.clearErrors();
                                                    }}
                                                    className="inline-flex justify-center rounded-md border border-transparent bg-gray-700 py-2 px-4 text-sm font-medium text-white shadow-sm transition hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 sm:w-fit"
                                                >
                                                    Clear
                                                </button>
                                            </div>
                                        </form>
                                    )}
                                </div>

                                {comments.data?.length > 0 ? (
                                    <div className="flex flex-col gap-y-4">
                                        {comments.data.map((comment) => (
                                            <CommentItem
                                                key={`comment-${comment.id}`}
                                                task={task}
                                                comment={comment}
                                                selectedComment={
                                                    selectedComment
                                                }
                                                setSelectedComment={
                                                    setSelectedComment
                                                }
                                                replyModal={replyCommentModal}
                                                editModal={editCommentModal}
                                                deleteModal={deleteCommentModal}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex justify-center">
                                        <span>No comments</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {task.can.update && (
                        <EditModal
                            isOpen={editModal.isOpen}
                            close={editModal.close}
                            task={task}
                        />
                    )}

                    {!task.closed_at && can("close task") && (
                        <CloseModal
                            isOpen={closeModal.isOpen}
                            close={closeModal.close}
                            task={task}
                        />
                    )}

                    {task.closed_at && can("close task") && (
                        <ReopenModal
                            isOpen={reopenModal.isOpen}
                            close={reopenModal.close}
                            task={task}
                        />
                    )}

                    {!task.solved_at && (
                        <SolvedModal
                            isOpen={solvedModal.isOpen}
                            close={solvedModal.close}
                            task={task}
                        />
                    )}

                    {task.can.create_progress && (
                        <CreateProgressModal
                            isOpen={progressModal.isOpen}
                            close={progressModal.close}
                            task={task}
                        />
                    )}

                    {(!task.closed_at || can("action closed task")) && (
                        <>
                            <ReplyCommentModal
                                isOpen={replyCommentModal.isOpen}
                                close={replyCommentModal.close}
                                task={task}
                                comment={selectedComment}
                            />

                            <EditCommentModal
                                isOpen={editCommentModal.isOpen}
                                close={editCommentModal.close}
                                task={task}
                                comment={selectedComment}
                            />

                            <DeleteCommentModal
                                isOpen={deleteCommentModal.isOpen}
                                close={deleteCommentModal.close}
                                comment={selectedComment}
                            />
                        </>
                    )}
                </Tab.Panel>

                <Tab.Panel
                    as="ul"
                    className="flex h-fit min-h-full flex-col gap-y-3 rounded-lg bg-gray-200 p-5 dark:bg-gray-800"
                >
                    <Progresses items={task.progresses} />
                </Tab.Panel>
            </Tab.Panels>
        </Tab.Group>
    );
};

Show.layout = (page) => (
    <DashboardLayout children={page} title="Task Details" />
);

export default Show;
