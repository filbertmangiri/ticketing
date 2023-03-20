import Input from "@/Components/Form/Input";
import Modal from "@/Components/Modal";
import { Toast } from "@/Helpers/Toast";
import { useForm } from "@inertiajs/react";
import { useEffect } from "react";

const EditModal = ({ isOpen, close, priority }) => {
    const form = useForm({
        name: "",
        deadline_days: "",
    });

    useEffect(() => {
        form.setData({
            ...form.data,
            name: priority.name,
            deadline_days: priority.deadline_days,
        });

        form.setDefaults({
            name: priority.name,
            deadline_days: priority.deadline_days,
        });
    }, [priority]);

    const submitHandler = (e) => {
        e.preventDefault();

        form.put(route("priority.update", priority.slug), {
            preserveScroll: true,
            onSuccess: () => {
                close();
                form.reset();
                Toast("success", "Priority successfully updated");
            },
        });
    };

    const inputHandler = (e) => {
        form.setData(e.target.name, e.target.value);
    };

    return (
        <Modal
            title={`Edit a priority - <b>${priority.name}</b>`}
            isOpen={isOpen}
            close={close}
        >
            <Modal.Body className="flex flex-col gap-y-3">
                <Input>
                    <Input.Label>Name</Input.Label>
                    <Input.Field
                        name="name"
                        value={form.data.name}
                        onChange={inputHandler}
                    />
                    <Input.Errors
                        errors={form.errors.name || form.errors.slug}
                    />
                </Input>
                <Input>
                    <Input.Label>Deadline (days)</Input.Label>
                    <Input.Field
                        type="number"
                        min={1}
                        max={30}
                        name="deadline_days"
                        value={form.data.deadline_days}
                        onChange={inputHandler}
                    />
                    <Input.Errors errors={form.errors.deadline_days} />
                </Input>
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
