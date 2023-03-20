import Input from "@/Components/Form/Input";
import Radio from "@/Components/Form/Radio";
import Select from "@/Components/Form/Select";
import TextArea from "@/Components/Form/TextArea";
import Modal from "@/Components/Modal";
import { Toast } from "@/Helpers/Toast";
import { useForm } from "@inertiajs/react";
import { useEffect } from "react";

const EditModal = ({ isOpen, close, subDepartment, departments }) => {
    const form = useForm({
        name: "",
        description: "",
        department: "",
    });

    useEffect(() => {
        form.setData({
            ...form.data,
            name: subDepartment.name,
            description: subDepartment.description,
            department: {
                value: subDepartment.department?.id,
                label: subDepartment.department?.name,
            },
        });

        form.setDefaults({
            name: subDepartment.name,
            description: subDepartment.description,
            department: {
                value: subDepartment.department?.id,
                label: subDepartment.department?.name,
            },
        });
    }, [subDepartment]);

    const submitHandler = (e) => {
        e.preventDefault();

        form.put(route("subDepartment.update", subDepartment.slug), {
            preserveScroll: true,
            onSuccess: () => {
                close();
                form.reset();
                Toast("success", "Sub Department successfully updated");
            },
        });
    };

    const inputHandler = (e) => {
        form.setData(e.target.name, e.target.value);
    };

    return (
        <Modal
            title={`Edit a sub-department - <b>${subDepartment.name}</b>`}
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
                <TextArea>
                    <TextArea.Label hint="Optional">Description</TextArea.Label>
                    <TextArea.Field
                        name="description"
                        value={form.data.description}
                        onChange={inputHandler}
                    />
                    <TextArea.Errors errors={form.errors.description} />
                </TextArea>

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
