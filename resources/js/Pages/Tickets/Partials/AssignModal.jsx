import Input from "@/Components/Form/Input";
import Select from "@/Components/Form/Select";
import Modal from "@/Components/Modal";
import { Toast } from "@/Helpers/Toast";
import { useForm } from "@inertiajs/react";

const AssignModal = ({ isOpen, close, ticket, technicians }) => {
    const form = useForm({
        technician: null,
        deadline: null,
    });

    const submitHandler = (e) => {
        e.preventDefault();

        form.patch(route("ticket.assign", ticket.number), {
            preserveScroll: true,
            onSuccess: () => {
                close();
                form.reset();
                Toast("success", "Ticket successfully assigned");
            },
        });
    };

    return (
        <Modal
            title={`Assign ticket - <b>${ticket.number}</b>`}
            isOpen={isOpen}
            close={close}
        >
            <Modal.Body className="flex flex-col gap-y-3">
                <Input.Label>Technician</Input.Label>
                <Select
                    options={technicians.map((technician) => ({
                        value: technician.id,
                        label: technician.name,
                    }))}
                    value={form.data.technician}
                    onChange={(value) => {
                        form.setData("technician", value);
                    }}
                    isSearchable={true}
                />
                <Input.Errors errors={form.errors.technician_id} />
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
                    {form.processing ? "..." : "Assign"}
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

export default AssignModal;
