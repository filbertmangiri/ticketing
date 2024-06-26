import Input from "@/Components/Form/Input";
import Select from "@/Components/Form/Select";
import TextArea from "@/Components/Form/TextArea";
import Modal from "@/Components/Modal";
import { Toast } from "@/Helpers/Toast";
import { useForm } from "@inertiajs/react";

const AssignModal = ({ isOpen, close, calibration, departments }) => {
    const form = useForm({
        department: null,
        description: "",
    });

    const submitHandler = (e) => {
        e.preventDefault();

        form.patch(route("calibration.assign", calibration.number), {
            preserveScroll: true,
            onSuccess: () => {
                close();
                form.reset();
                Toast("success", "Calibration successfully assigned");
            },
        });
    };

    return (
        <Modal
            title={`Assign calibration - <b>${calibration.number}</b>`}
            isOpen={isOpen}
            close={close}
        >
            <Modal.Body className="flex flex-col gap-y-3">
                <Input.Label>Department</Input.Label>
                <Select
                    options={departments.map((department) => ({
                        value: department.id,
                        label: department.name,
                    }))}
                    value={form.data.department}
                    onChange={(value) => {
                        form.setData("department", value);
                    }}
                    isSearchable={true}
                />
                <Input.Errors errors={form.errors.department_id} />

                <TextArea>
                    <TextArea.Field
                        className="bg-gray-100 dark:bg-gray-800"
                        placeholder="Add a progress description . . ."
                        name="description"
                        value={form.data.description}
                        onChange={(e) => {
                            form.setData("description", e.target.value);
                        }}
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
