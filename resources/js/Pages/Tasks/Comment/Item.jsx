import AttachmentItem from "@/Components/AttachmentItem";
import { auth } from "@/Helpers/Auth";
import { can } from "@/Helpers/Permission";
import { useState } from "react";

const CommentItem = ({
    task,
    comment,
    selectedComment,
    setSelectedComment,
    replyModal,
    editModal,
    deleteModal,
    ...props
}) => {
    const [expand, setExpand] = useState(false);

    return (
        <div {...props} className="flex flex-col gap-y-4">
            <div
                key={`comment-${comment.id}`}
                className="flex flex-col gap-y-4 rounded-md bg-gray-100 p-4 dark:bg-gray-700"
            >
                <div className="flex items-center text-sm md:justify-between">
                    <div className="flex items-center gap-x-3">
                        <img
                            src={comment.author_profile_picture}
                            className="h-8 w-8 rounded-full ring-1 ring-gray-900 group-hover:ring-2 group-hover:ring-gray-600 dark:ring-gray-100 dark:group-hover:ring-gray-400"
                            alt={`${comment.author?.name}'s profile picture`}
                        />

                        <div>
                            <span>
                                {comment.author?.id
                                    ? comment.author?.name
                                    : comment.author || "-"}
                            </span>

                            {comment.author?.id === auth().user?.id && (
                                <span className="ml-1 font-extrabold">
                                    ( You )
                                </span>
                            )}

                            {comment.author?.id === task.issuer?.id ? (
                                <span className="ml-2 font-extrabold text-green-600 dark:text-green-400">
                                    ( Task Issuer )
                                </span>
                            ) : comment.author?.id === task.technician?.id ? (
                                <span className="ml-2 font-extrabold text-blue-600 dark:text-blue-400">
                                    ( Support )
                                </span>
                            ) : (
                                ""
                            )}
                        </div>
                    </div>

                    <div className="text-end">
                        <div className="text-xs">{comment.created_at}</div>
                        {/* {comment.updated_at != comment.created_at && (
                            <div className="text-xs">
                                Last edited {comment.updated_at}
                            </div>
                        )} */}
                    </div>
                </div>

                <div className="flex flex-col">
                    <p
                        className="ck-content border-y border-gray-300 py-5 text-sm dark:border-gray-500"
                        dangerouslySetInnerHTML={{ __html: comment.body }}
                    />

                    {comment.attachments?.length > 0 && (
                        <>
                            <div className="mt-4 w-full whitespace-nowrap text-sm">
                                Attachments :
                            </div>

                            <ul className="mt-2 flex w-full flex-1 flex-wrap gap-2">
                                {comment.attachments.map((attachment) => (
                                    <AttachmentItem
                                        key={`attachment-${attachment.id}`}
                                        attachment={attachment}
                                        withDownload={true}
                                    />
                                ))}
                            </ul>
                        </>
                    )}
                </div>

                <div className="flex justify-between text-xs">
                    <div>
                        {comment.childrens?.length > 0 && (
                            <button
                                type="button"
                                onClick={() => setExpand(!expand)}
                                className="underline underline-offset-4 hover:text-blue-600 dark:hover:text-blue-400"
                            >
                                {expand
                                    ? "Hide Replies"
                                    : `Show ${comment.childrens?.length} Replies`}
                            </button>
                        )}
                    </div>

                    <div className="flex gap-x-2">
                        {(!task.closed_at || can("action closed task")) && (
                            <button
                                type="button"
                                onClick={() => {
                                    setSelectedComment(comment);
                                    replyModal.open();
                                }}
                                className="underline underline-offset-4 hover:text-blue-600 dark:hover:text-blue-400"
                            >
                                Reply
                            </button>
                        )}
                        {comment.can.update && (
                            <button
                                type="button"
                                onClick={() => {
                                    setSelectedComment(comment);
                                    editModal.open();
                                }}
                                className="underline underline-offset-4 hover:text-blue-600 dark:hover:text-blue-400"
                            >
                                Edit
                            </button>
                        )}
                        {comment.can.delete && (
                            <button
                                type="button"
                                onClick={() => {
                                    setSelectedComment(comment);
                                    deleteModal.open();
                                }}
                                className="underline underline-offset-4 hover:text-blue-600 dark:hover:text-blue-400"
                            >
                                Delete
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {comment.childrens?.length && expand > 0 ? (
                <div className="flex flex-col gap-y-4 border-l border-blue-600 pl-8 dark:border-blue-400">
                    {comment.childrens.map((child) => (
                        <CommentItem
                            key={`comment-${child.id}`}
                            task={task}
                            comment={child}
                            selectedComment={selectedComment}
                            setSelectedComment={setSelectedComment}
                            replyModal={replyModal}
                            editModal={editModal}
                            deleteModal={deleteModal}
                        />
                    ))}
                </div>
            ) : (
                ""
            )}
        </div>
    );
};

export default CommentItem;
