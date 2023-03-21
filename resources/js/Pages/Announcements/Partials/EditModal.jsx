import Input from "@/Components/Form/Input";
import TextArea from "@/Components/Form/TextArea";
import Modal from "@/Components/Modal";
import { Toast } from "@/Helpers/Toast";
import { useForm } from "@inertiajs/react";
import { useEffect } from "react";

const EditModal = ({ isOpen, close, announcement }) => {
    const form = useForm({
        title: "",
        body: "",
    });

    useEffect(() => {
        form.setData({
            ...form.data,
            title: announcement.title,
            body: announcement.body,
        });

        form.setDefaults({
            title: announcement.title,
            body: announcement.body,
        });
    }, [announcement]);

    const submitHandler = (e) => {
        e.preventDefault();

        form.put(route("announcement.update", announcement.id), {
            preserveScroll: true,
            onSuccess: () => {
                close();
                form.reset();
                Toast("success", "Announcement successfully updated");
            },
        });
    };

    const inputHandler = (e) => {
        form.setData(e.target.name, e.target.value);
    };

    return (
        <Modal title={`Edit a announcement`} isOpen={isOpen} close={close}>
            <Modal.Body className="flex flex-col gap-y-3">
                <Input>
                    <Input.Label>Title</Input.Label>
                    <Input.Field
                        name="title"
                        value={form.data.title}
                        onChange={inputHandler}
                    />
                    <Input.Errors
                        errors={form.errors.title || form.errors.slug}
                    />
                </Input>

                <TextArea>
                    <TextArea.Label>Description</TextArea.Label>
                    <TextArea.Field
                        name="body"
                        value={form.data.body}
                        onChange={inputHandler}
                    />
                    <TextArea.Errors errors={form.errors.body} />
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
