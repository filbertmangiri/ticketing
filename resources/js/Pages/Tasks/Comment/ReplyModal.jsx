import AttachmentItem from "@/Components/AttachmentItem";
import Editor from "@/Components/Form/Editor";
import Input from "@/Components/Form/Input";
import Modal from "@/Components/Modal";
import { Toast } from "@/Helpers/Toast";
import { useForm } from "@inertiajs/react";
import { useEffect } from "react";
import { useDropzone } from "react-dropzone";

const ReplyModal = ({ isOpen, close, task, comment }) => {
    const form = useForm({
        task_id: task?.id,
        parent_id: comment?.id,
        body: "",
        attachments: [],
    });

    useEffect(() => {
        form.setData({
            ...form.data,
            parent_id: comment?.id,
        });

        form.setDefaults({
            parent_id: comment?.id,
        });
    }, [comment]);

    /* useEffect(() => {
        if (!isOpen) {
            form.reset();
            form.clearErrors();
        }
    }, [isOpen]); */

    const submitHandler = (e) => {
        e.preventDefault();

        form.post(route("task_comment.store"), {
            preserveScroll: true,
            onSuccess: () => {
                close();
                form.reset();
                commentForm.setData("attachments", []);
                Toast("success", "Comment successfully added");
            },
        });
    };

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

    useEffect(() => {
        form.setData("attachments", [
            ...form.data.attachments,
            ...acceptedFiles,
        ]);
    }, [acceptedFiles]);

    const deleteAttachmentHandler = (index) => {
        form.setData(
            "attachments",
            form.data.attachments.filter(function (_, arrIndex) {
                return index !== arrIndex;
            })
        );
    };

    return (
        <Modal title="Reply a comment" isOpen={isOpen} close={close}>
            <Modal.Body className="flex flex-col gap-y-3">
                <div>
                    {/* <TextArea.Field
                        className="bg-gray-100 dark:bg-gray-800"
                        placeholder="Add your comment . . ."
                        value={form.data.body}
                        onChange={(e) => form.setData("body", e.target.value)}
                    /> */}

                    <Editor
                        data={form.data.body}
                        setData={form.setData}
                        config={{
                            placeholder: "Add your comment . . .",
                        }}
                    />

                    <Input.Errors errors={form.errors.body} />
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
                            Drag 'n' drop some files here, or click to select
                            files
                        </p>
                    </div>
                    <ul className="mt-4 flex w-full flex-1 flex-wrap gap-2">
                        {form.data.attachments?.length > 0 ? (
                            form.data.attachments.map((attachment, index) => {
                                const file = {
                                    path: URL.createObjectURL(attachment),
                                    name: attachment.name,
                                    size: attachment.size,
                                    mime_type: attachment.type,
                                };

                                return (
                                    <AttachmentItem
                                        key={`attachment-${index}`}
                                        index={index}
                                        attachment={file}
                                        deleteHandler={deleteAttachmentHandler}
                                        error={
                                            form.errors["attachments." + index]
                                        }
                                    />
                                );
                            })
                        ) : (
                            <li className="flex h-full w-full flex-col items-center justify-center text-center">
                                <span className="text-small text-gray-500">
                                    No files selected
                                </span>
                            </li>
                        )}
                    </ul>
                </section>
            </Modal.Body>

            <Modal.Footer className="flex gap-x-2">
                <button
                    type="button"
                    onClick={submitHandler}
                    disabled={form.processing}
                    className={`${
                        form.processing && "cursor-wait"
                    } inline-flex justify-center rounded-md border border-transparent bg-green-700 py-2 px-4 text-sm font-medium text-white shadow-sm transition hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2`}
                >
                    {form.processing ? "..." : "Create"}
                </button>

                <button
                    type="button"
                    onClick={() => {
                        form.reset();
                        form.clearErrors();
                    }}
                    className="inline-flex justify-center rounded-md border border-transparent bg-gray-700 py-2 px-4 text-sm font-medium text-white shadow-sm transition hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                    Clear
                </button>
            </Modal.Footer>
        </Modal>
    );
};

export default ReplyModal;
