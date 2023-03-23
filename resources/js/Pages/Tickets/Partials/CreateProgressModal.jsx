import Input from "@/Components/Form/Input";
import TextArea from "@/Components/Form/TextArea";
import Modal from "@/Components/Modal";
import { Toast } from "@/Helpers/Toast";
import { useForm } from "@inertiajs/react";

const CreateProgressModal = ({ isOpen, close, ticket }) => {
    const form = useForm({
        value: "",
        description: "",
    });

    const submitHandler = (e) => {
        e.preventDefault();

        form.post(route("ticket.createProgress", ticket.number), {
            preserveScroll: true,
            onSuccess: () => {
                close();
                form.reset();
                Toast("success", "Progress successfully updated");
            },
        });
    };

    const inputHandler = (e) => {
        form.setData(e.target.name, e.target.value);
    };

    return (
        <Modal title="Update progress" isOpen={isOpen} close={close}>
            <Modal.Body className="flex flex-col gap-y-3">
                <Input>
                    <Input.Label>Progress (percentage)</Input.Label>
                    <Input.Field
                        type="number"
                        name="value"
                        value={form.data.value}
                        onChange={inputHandler}
                    />
                    <Input.Errors
                        errors={form.errors.value || form.errors.slug}
                    />
                </Input>

                <TextArea>
                    <TextArea.Field
                        className="bg-gray-100 dark:bg-gray-800"
                        placeholder="Add a description . . ."
                        name="description"
                        value={form.data.description}
                        onChange={inputHandler}
                    />
                    <Input.Errors errors={form.errors.description} />
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
                    {form.processing ? "..." : "Update"}
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

export default CreateProgressModal;
