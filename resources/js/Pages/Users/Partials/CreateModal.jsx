import Input from "@/Components/Form/Input";
import Radio from "@/Components/Form/Radio";
import Select from "@/Components/Form/Select";
import Modal from "@/Components/Modal";
import { Toast } from "@/Helpers/Toast";
import { useForm } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useState } from "react";

const CreateModal = ({
    isOpen,
    close,
    departments,
    roles,
    selectedDepartment = null,
    selectedSubDepartment = null,
}) => {
    const form = useForm({
        name: "",
        email: "",
        username: "",
        phone: "",
        gender: "",
        department: selectedDepartment
            ? {
                  value: selectedDepartment.id,
                  label: selectedDepartment.name,
              }
            : null,
        sub_department: selectedSubDepartment
            ? {
                  value: selectedSubDepartment.id,
                  label: selectedSubDepartment.name,
              }
            : null,
        roles: null,
    });

    const [subDepartments, setSubDepartments] = useState([]);

    useEffect(() => {
        if (selectedDepartment) {
            fetchSubDepartments({
                value: selectedDepartment.id,
            });
        }
    }, []);

    const fetchSubDepartments = (department) => {
        if (department) {
            axios
                .get(route("department.fetchSubDepartments", department.value))
                .then((res) => {
                    setSubDepartments(res.data);
                });
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();

        form.post(route("user.store"), {
            preserveScroll: true,
            onSuccess: () => {
                close();
                form.reset();
                Toast("success", "User successfully created");
            },
        });
    };

    const inputHandler = (e) => {
        form.setData(e.target.name, e.target.value);
    };

    return (
        <Modal title="Create a new user" isOpen={isOpen} close={close}>
            <Modal.Body className="flex flex-col gap-y-3">
                <Input>
                    <Input.Label>Name</Input.Label>
                    <Input.Field
                        name="name"
                        value={form.data.name}
                        onChange={inputHandler}
                    />
                    <Input.Errors errors={form.errors.name} />
                </Input>
                <Input>
                    <Input.Label>Email</Input.Label>
                    <Input.Field
                        name="email"
                        value={form.data.email}
                        onChange={inputHandler}
                    />
                    <Input.Errors errors={form.errors.email} />
                </Input>
                <Input>
                    <Input.Label>Username</Input.Label>
                    <Input.Field
                        name="username"
                        value={form.data.username}
                        onChange={inputHandler}
                    />
                    <Input.Errors errors={form.errors.username} />
                </Input>
                <Input>
                    <Input.Label>Phone</Input.Label>
                    <Input.Field
                        name="phone"
                        value={form.data.phone}
                        onChange={inputHandler}
                    />
                    <Input.Errors errors={form.errors.phone} />
                </Input>
                <Radio>
                    <Radio.Label>Gender</Radio.Label>
                    <Radio.Options
                        inline
                        name="gender"
                        currentChecked={form.data.gender}
                        onChange={inputHandler}
                        options={[
                            { value: "male", label: "Male" },
                            { value: "female", label: "Female" },
                        ]}
                    />
                    <Input.Errors errors={form.errors.gender} />
                </Radio>

                <Input.Label>Department</Input.Label>
                <Select
                    options={departments.map((department) => ({
                        value: department.id,
                        label: department.name,
                    }))}
                    value={form.data.department}
                    onChange={(value) => {
                        if (value) {
                            fetchSubDepartments(value);

                            form.setData({
                                ...form.data,
                                department: value,
                                sub_department: null,
                            });
                        } else {
                            setSubDepartments([]);

                            form.setData({
                                ...form.data,
                                department: null,
                                sub_department: null,
                            });
                        }
                    }}
                    isSearchable={true}
                    isClearable={true}
                />
                <Input.Errors errors={form.errors.department_id} />

                <Input.Label>Sub Department</Input.Label>
                <Select
                    options={subDepartments.map((sub_department) => ({
                        value: sub_department.id,
                        label: sub_department.name,
                    }))}
                    value={form.data.sub_department}
                    onChange={(value) => {
                        form.setData("sub_department", value);
                    }}
                    isSearchable={true}
                    isClearable={true}
                />
                <Input.Errors errors={form.errors.sub_department_id} />

                <Input.Label>Roles</Input.Label>
                <Select
                    options={roles.map((role) => ({
                        value: role.id,
                        label: role.name,
                    }))}
                    value={form.data.roles}
                    onChange={(value) => {
                        form.setData("roles", value);
                    }}
                    isMultiple={true}
                    isSearchable={true}
                    isClearable={true}
                />
                <Input.Errors errors={form.errors.roles} />
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
                        setSubDepartments([]);
                    }}
                    className="inline-flex justify-center rounded-md border border-transparent bg-gray-700 py-2 px-4 text-sm font-medium text-white shadow-sm transition hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                    Clear
                </button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateModal;
