import Editor from "@/Components/Form/Editor";
import Input from "@/Components/Form/Input";
import TextArea from "@/Components/Form/TextArea";
import Modal from "@/Components/Modal";
import { Toast } from "@/Helpers/Toast";
import { useForm } from "@inertiajs/react";
import { useEffect } from "react";

const EditModal = ({ isOpen, close, calibration, comment }) => {
    const form = useForm({
        calibration_id: calibration?.id,
        body: "",
    });

    useEffect(() => {
        form.setData({
            ...form.data,
            body: comment?.body || "",
        });

        form.setDefaults({
            body: comment?.body || "",
        });
    }, [comment]);

    const submitHandler = (e) => {
        e.preventDefault();

        form.put(route("calibration_comment.update", comment.id), {
            preserveScroll: true,
            onSuccess: () => {
                close();
                form.reset();
                Toast("success", "Comment successfully updated");
            },
        });
    };

    return (
        <Modal title="Edit a comment" isOpen={isOpen} close={close}>
            <Modal.Body className="flex flex-col gap-y-3">
                <TextArea>
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
                </TextArea>
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
                    {form.processing ? "..." : "Save"}
                </button>

                <button
                    type="button"
                    onClick={() => {
                        form.reset();
                        form.clearErrors();
                    }}
                    className="inline-flex justify-center rounded-md border border-transparent bg-gray-700 py-2 px-4 text-sm font-medium text-white shadow-sm transition hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                    Reset
                </button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditModal;
