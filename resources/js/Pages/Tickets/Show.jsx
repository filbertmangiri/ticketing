import AttachmentItem from "@/Components/AttachmentItem";
import Input from "@/Components/Form/Input";
import TextArea from "@/Components/Form/TextArea";
import { can } from "@/Helpers/Permission";
import { Toast } from "@/Helpers/Toast";
import useModal from "@/Hooks/useModal";
import DashboardLayout from "@/Layouts/Dashboard";
import { Tab } from "@headlessui/react";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import { Link, useForm } from "@inertiajs/react";
import "ckeditor-tailwind-reset/ckeditor-tailwind-reset.css";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import DeleteCommentModal from "./Comment/DeleteModal";
import EditCommentModal from "./Comment/EditModal";
import CommentItem from "./Comment/Item";
import ReplyCommentModal from "./Comment/ReplyModal";
import AssignModal from "./Partials/AssignModal";
import CloseModal from "./Partials/CloseModal";
import CreateProgressModal from "./Partials/CreateProgressModal";
import EditModal from "./Partials/EditModal";
import ReopenModal from "./Partials/ReopenModal";
import SolvedModal from "./Partials/SolvedModal";

const Show = ({
    technicians,
    categories,
    locations,
    priorities,
    comments,
    ...props
}) => {
    const { data: ticket } = props.ticket;

    const commentForm = useForm({
        ticket_id: ticket.id,
        body: "",
    });

    const commentSubmitHandler = (e) => {
        e.preventDefault();

        commentForm.post(route("comment.store", ticket.id), {
            preserveScroll: true,

            onSuccess: () => {
                commentForm.reset();
                Toast("success", "Comment successfully added");
            },
        });
    };

    /* Edit */
    const editModal = useModal(false);

    /* Assign ticket to technician */
    const assignModal = useModal(false);

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
                                            Ticket Number :
                                        </div>
                                        <div className="w-full font-extralight max-md:text-right">
                                            {ticket.number}
                                        </div>
                                    </li>
                                    <li className="-mt-px inline-flex items-center gap-x-2 border bg-white py-3 px-4 text-sm font-medium text-gray-800 first:mt-0 first:rounded-t-lg last:rounded-b-lg odd:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:odd:bg-slate-800 md:flex-col">
                                        <div className="w-full whitespace-nowrap font-extrabold">
                                            Category :
                                        </div>
                                        <div className="w-full font-extralight max-md:text-right">
                                            {ticket.category?.id ? (
                                                <Link
                                                    href={route(
                                                        "category.show",
                                                        ticket.category?.slug
                                                    )}
                                                >
                                                    {ticket.category?.name}
                                                </Link>
                                            ) : (
                                                ticket.category || "-"
                                            )}
                                        </div>
                                    </li>
                                    <li className="-mt-px inline-flex items-center gap-x-2 border bg-white py-3 px-4 text-sm font-medium text-gray-800 first:mt-0 first:rounded-t-lg last:rounded-b-lg odd:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:odd:bg-slate-800 md:flex-col">
                                        <div className="w-full whitespace-nowrap font-extrabold">
                                            Product :
                                        </div>
                                        <div className="w-full font-extralight max-md:text-right">
                                            {ticket.product?.id ? (
                                                <Link
                                                    href={route(
                                                        "product.show",
                                                        ticket.product?.slug
                                                    )}
                                                >
                                                    {ticket.product?.name}
                                                </Link>
                                            ) : (
                                                ticket.product || "-"
                                            )}
                                        </div>
                                    </li>
                                    <li className="-mt-px inline-flex items-center gap-x-2 border bg-white py-3 px-4 text-sm font-medium text-gray-800 first:mt-0 first:rounded-t-lg last:rounded-b-lg odd:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:odd:bg-slate-800 md:flex-col">
                                        <div className="w-full whitespace-nowrap font-extrabold">
                                            Location :
                                        </div>
                                        <div className="w-full font-extralight max-md:text-right">
                                            {ticket.location?.id ? (
                                                <Link
                                                    href={route(
                                                        "location.show",
                                                        ticket.location?.slug
                                                    )}
                                                >
                                                    {ticket.location?.name}
                                                </Link>
                                            ) : (
                                                ticket.location || "-"
                                            )}
                                        </div>
                                    </li>
                                    <li className="-mt-px inline-flex items-center gap-x-2 border bg-white py-3 px-4 text-sm font-medium text-gray-800 first:mt-0 first:rounded-t-lg last:rounded-b-lg odd:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:odd:bg-slate-800 md:flex-col">
                                        <div className="w-full whitespace-nowrap font-extrabold">
                                            Priority :
                                        </div>
                                        <div className="w-full font-extralight max-md:text-right">
                                            {ticket.priority?.id ? (
                                                <Link
                                                    href={route(
                                                        "priority.show",
                                                        ticket.priority?.slug
                                                    )}
                                                >
                                                    {ticket.priority?.name}
                                                </Link>
                                            ) : (
                                                ticket.priority || "-"
                                            )}
                                        </div>
                                    </li>
                                    <li className="-mt-px inline-flex items-center gap-x-2 border bg-white py-3 px-4 text-sm font-medium text-gray-800 first:mt-0 first:rounded-t-lg last:rounded-b-lg odd:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:odd:bg-slate-800 md:flex-col">
                                        <div className="w-full whitespace-nowrap font-extrabold">
                                            Submitted at :
                                        </div>
                                        <div className="w-full font-extralight max-md:text-right">
                                            {ticket.created_at}
                                        </div>
                                    </li>
                                    <li className="-mt-px inline-flex items-center gap-x-2 border bg-white py-3 px-4 text-sm font-medium text-gray-800 first:mt-0 first:rounded-t-lg last:rounded-b-lg odd:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:odd:bg-slate-800 md:flex-col">
                                        <div className="w-full whitespace-nowrap font-extrabold">
                                            Status :
                                        </div>
                                        <div className="w-full font-extralight max-md:text-right">
                                            {ticket.closed_at
                                                ? "Closed"
                                                : ticket.solved_at
                                                ? "Solved"
                                                : ticket.status?.label || "-"}
                                        </div>
                                    </li>
                                    <li className="-mt-px inline-flex items-center gap-x-2 border bg-white py-3 px-4 text-sm font-medium text-gray-800 first:mt-0 first:rounded-t-lg last:rounded-b-lg odd:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:odd:bg-slate-800 md:flex-col">
                                        <div className="w-full whitespace-nowrap font-extrabold">
                                            Last updated :
                                        </div>
                                        <div className="w-full font-extralight max-md:text-right">
                                            {ticket.updated_at || "-"}
                                        </div>
                                    </li>
                                    {ticket.technician && (
                                        <li className="-mt-px inline-flex items-center gap-x-2 border bg-white py-3 px-4 text-sm font-medium text-gray-800 first:mt-0 first:rounded-t-lg last:rounded-b-lg odd:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:odd:bg-slate-800 md:flex-col">
                                            <div className="w-full whitespace-nowrap font-extrabold">
                                                Technician :
                                            </div>
                                            <div className="w-full font-extralight max-md:text-right">
                                                {ticket.technician?.id ? (
                                                    <Link
                                                        href={route(
                                                            "user.show",
                                                            ticket.technician
                                                                ?.username
                                                        )}
                                                    >
                                                        {
                                                            ticket.technician
                                                                ?.name
                                                        }
                                                    </Link>
                                                ) : (
                                                    ticket.technician || "-"
                                                )}
                                            </div>
                                        </li>
                                    )}
                                    <li className="-mt-px inline-flex items-center gap-x-2 border bg-white py-3 px-4 text-sm font-medium text-gray-800 first:mt-0 first:rounded-t-lg last:rounded-b-lg odd:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:odd:bg-slate-800 md:flex-col">
                                        <div className="w-full whitespace-nowrap font-extrabold">
                                            Deadline :
                                        </div>
                                        <div className="w-full font-extralight max-md:text-right">
                                            {ticket.deadline_at}
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <div className="flex flex-col gap-2">
                                <span className="text-xl font-extrabold">
                                    User
                                </span>

                                <ul className="flex max-w-xs flex-col">
                                    <li className="-mt-px inline-flex items-center gap-x-2 border bg-white py-3 px-4 text-sm font-medium text-gray-800 first:mt-0 first:rounded-t-lg last:rounded-b-lg odd:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:odd:bg-slate-800 md:flex-col">
                                        <div className="w-full whitespace-nowrap font-extrabold">
                                            Name :
                                        </div>
                                        <div className="w-full font-extralight max-md:text-right">
                                            {ticket.issuer ? (
                                                <Link
                                                    href={route(
                                                        "user.show",
                                                        ticket.issuer?.username
                                                    )}
                                                >
                                                    {ticket.issuer?.name}
                                                </Link>
                                            ) : (
                                                ticket.issuer_name || "-"
                                            )}
                                        </div>
                                    </li>
                                    <li className="-mt-px inline-flex items-center gap-x-2 border bg-white py-3 px-4 text-sm font-medium text-gray-800 first:mt-0 first:rounded-t-lg last:rounded-b-lg odd:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:odd:bg-slate-800 md:flex-col">
                                        <div className="w-full whitespace-nowrap font-extrabold">
                                            Department :
                                        </div>
                                        <div className="w-full font-extralight max-md:text-right">
                                            {ticket.department ? (
                                                <Link
                                                    href={route(
                                                        "department.show",
                                                        ticket.department?.slug
                                                    )}
                                                >
                                                    {ticket.department?.name}
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
                                            {ticket.sub_department ? (
                                                <Link
                                                    href={route(
                                                        "subDepartment.show",
                                                        ticket.sub_department
                                                            ?.slug
                                                    )}
                                                >
                                                    {
                                                        ticket.sub_department
                                                            ?.name
                                                    }
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
                                        {ticket.closed_at ? (
                                            <span className="mr-2 font-extrabold text-red-500">
                                                [CLOSED]
                                            </span>
                                        ) : (
                                            ""
                                        )}
                                        {ticket.title}
                                    </div>
                                </li>
                                <li className="-mt-px inline-flex flex-col items-center gap-x-2 border bg-white py-3 px-4 text-sm font-medium text-gray-800 first:mt-0 first:rounded-t-lg last:rounded-b-lg odd:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:odd:bg-slate-800">
                                    <div className="w-full whitespace-nowrap font-extrabold">
                                        Description :
                                    </div>
                                    <div
                                        className="ck-content mt-2 w-full border-gray-300 font-extralight dark:border-gray-700 md:p-4"
                                        dangerouslySetInnerHTML={{
                                            __html: ticket.body,
                                        }}
                                    />
                                </li>
                                <li className="-mt-px inline-flex flex-col items-center gap-x-2 border bg-white py-3 px-4 text-sm font-medium text-gray-800 first:mt-0 first:rounded-t-lg last:rounded-b-lg odd:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:odd:bg-slate-800">
                                    <div className="w-full whitespace-nowrap font-extrabold">
                                        Attachments :
                                    </div>
                                    <ul className="mt-2 flex w-full flex-1 flex-wrap gap-2">
                                        {ticket.attachments.length > 0 ? (
                                            ticket.attachments.map(
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
                                    {ticket.can.update && (
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

                                    {!ticket.technician &&
                                        can("assign ticket") && (
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    assignModal.open();
                                                }}
                                                className="inline-flex justify-center rounded-md border border-transparent bg-blue-500 py-2 px-4 text-sm font-medium text-white shadow-sm transition hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-600 dark:hover:bg-blue-700 sm:w-fit"
                                            >
                                                Assign
                                            </button>
                                        )}

                                    {!ticket.closed_at &&
                                        can("close ticket") && (
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

                                    {ticket.closed_at &&
                                        can("close ticket") && (
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
                                    {ticket.can.solved && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                solvedModal.open();
                                            }}
                                            className="inline-flex justify-center rounded-md border border-transparent bg-green-700 py-2 px-4 text-sm font-medium text-white shadow-sm transition hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:w-fit"
                                        >
                                            Solved
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-col gap-y-2">
                                <div className="flex justify-between">
                                    <span className="text-xl font-extrabold">
                                        Progress
                                    </span>

                                    {ticket.can.create_progress && (
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
                                            width: `${ticket.progress}%`,
                                        }}
                                        aria-valuenow={ticket.progress}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                    >
                                        {ticket.progress}%
                                    </div>
                                </div>
                            </div>

                            {ticket.solved_at && (
                                <div className="flex items-center justify-between rounded-lg bg-green-600 px-5 py-3 text-white dark:bg-green-700">
                                    <div className="flex gap-2">
                                        <CheckBadgeIcon className="h-6 w-6 stroke-2" />
                                        <span className="font-semibold">
                                            Solved
                                        </span>
                                    </div>

                                    <span className="text-sm">
                                        {ticket.solved_at}
                                    </span>
                                </div>
                            )}

                            <div className="flex flex-col gap-y-8">
                                <div className="flex flex-col gap-y-2">
                                    <span className="text-xl font-extrabold">
                                        Comments
                                    </span>

                                    {(!ticket.closed_at ||
                                        can("action closed ticket")) && (
                                        <form
                                            onSubmit={commentSubmitHandler}
                                            className="flex flex-col gap-y-3"
                                        >
                                            <TextArea>
                                                <TextArea.Field
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
                                                />
                                                <Input.Errors
                                                    errors={
                                                        commentForm.errors.body
                                                    }
                                                />
                                            </TextArea>

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
                                                ticket={ticket}
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

                    {ticket.can.update && (
                        <EditModal
                            isOpen={editModal.isOpen}
                            close={editModal.close}
                            ticket={ticket}
                            categories={categories}
                            locations={locations}
                            priorities={priorities}
                        />
                    )}

                    {!ticket.technician && can("assign ticket") && (
                        <AssignModal
                            isOpen={assignModal.isOpen}
                            close={assignModal.close}
                            ticket={ticket}
                            technicians={technicians}
                        />
                    )}

                    {!ticket.closed_at && can("close ticket") && (
                        <CloseModal
                            isOpen={closeModal.isOpen}
                            close={closeModal.close}
                            ticket={ticket}
                        />
                    )}

                    {ticket.closed_at && can("close ticket") && (
                        <ReopenModal
                            isOpen={reopenModal.isOpen}
                            close={reopenModal.close}
                            ticket={ticket}
                        />
                    )}

                    {!ticket.solved_at && (
                        <SolvedModal
                            isOpen={solvedModal.isOpen}
                            close={solvedModal.close}
                            ticket={ticket}
                        />
                    )}

                    {ticket.can.create_progress && (
                        <CreateProgressModal
                            isOpen={progressModal.isOpen}
                            close={progressModal.close}
                            ticket={ticket}
                        />
                    )}

                    {(!ticket.closed_at || can("action closed ticket")) && (
                        <>
                            <ReplyCommentModal
                                isOpen={replyCommentModal.isOpen}
                                close={replyCommentModal.close}
                                ticket={ticket}
                                comment={selectedComment}
                            />

                            <EditCommentModal
                                isOpen={editCommentModal.isOpen}
                                close={editCommentModal.close}
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
                    {ticket.progresses?.length > 0 &&
                        ticket.progresses?.map((progress, index) => (
                            <li key={index} className="border-l-4 pl-16">
                                <div className="flex h-fit min-h-[100px] flex-col gap-y-2 rounded-lg bg-blue-300 p-3 text-sm dark:bg-gray-700">
                                    <div className="flex justify-between">
                                        <span className="font-bold">
                                            {[
                                                "created",
                                                "solved",
                                                "closed",
                                            ].includes(progress.value)
                                                ? `Ticket ${progress.value}`
                                                : `Progress updated to ${progress.value}%`}
                                        </span>
                                        <span>{progress.created_at}</span>
                                    </div>
                                    <div>{progress.description}</div>
                                </div>
                            </li>
                        ))}
                </Tab.Panel>
            </Tab.Panels>
        </Tab.Group>
    );
};

Show.layout = (page) => (
    <DashboardLayout children={page} title="Ticket Details" />
);

export default Show;
