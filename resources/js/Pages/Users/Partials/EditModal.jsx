import Input from "@/Components/Form/Input";
import Radio from "@/Components/Form/Radio";
import Select from "@/Components/Form/Select";
import Modal from "@/Components/Modal";
import { can } from "@/Helpers/Permission";
import { Toast } from "@/Helpers/Toast";
import { useForm } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";

const EditModal = ({ isOpen, close, user, departments, roles }) => {
    const form = useForm({
        name: "",
        email: "",
        username: "",
        phone: "",
        gender: "",
        department: null,
        sub_department: null,
        roles: [],
    });

    const initialMount = useRef(true);

    useEffect(() => {
        if (initialMount.current) {
            initialMount.current = false;
            return;
        }

        form.setData({
            ...form.data,
            name: user.name,
            email: user.email,
            username: user.username,
            phone: user.phone,
            gender: user.gender?.value,
            department: user.department
                ? {
                      value: user.department?.id,
                      label: user.department?.name,
                  }
                : null,
            sub_department: user.sub_department
                ? {
                      value: user.sub_department?.id,
                      label: user.sub_department?.name,
                  }
                : null,
            roles: user.roles
                ? user.roles.map((role) => {
                      return {
                          value: role.id,
                          label: role.name,
                      };
                  })
                : [],
        });

        form.setDefaults({
            name: user.name,
            email: user.email,
            username: user.username,
            phone: user.phone,
            gender: user.gender?.value,
            department: user.department
                ? {
                      value: user.department?.id,
                      label: user.department?.name,
                  }
                : null,
            sub_department: user.sub_department
                ? {
                      value: user.sub_department?.id,
                      label: user.sub_department?.name,
                  }
                : null,
            roles: user.roles
                ? user.roles.map((role) => {
                      return {
                          value: role.id,
                          label: role.name,
                      };
                  })
                : [],
        });

        if (user.department) {
            fetchSubDepartments({
                value: user.department?.id,
            });
        }
    }, [user]);

    const [subDepartments, setSubDepartments] = useState([]);

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

        form.put(route("user.update", user.username), {
            preserveScroll: true,
            onSuccess: () => {
                close();
                form.reset();
                Toast("success", "User successfully updated");
            },
        });
    };

    const inputHandler = (e) => {
        form.setData(e.target.name, e.target.value);
    };

    const resetPasswordHandler = () => {
        axios
            .post(route("user.resetDefaultPassword", user.username))
            .then((res) => {
                Toast("success", "Password successfully reset to default");
            })
            .catch((err) => {
                Toast("error", "Something went wrong");
            });
    };

    return (
        <Modal
            title={`Edit a user - <b>${user.name}</b>`}
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

            <Modal.Footer className="flex justify-between">
                <div className="flex gap-x-2">
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
                </div>

                <div>
                    {can("reset default password user") && (
                        <button
                            type="button"
                            onClick={resetPasswordHandler}
                            className="inline-flex justify-center rounded-md border border-transparent bg-yellow-700 py-2 px-4 text-sm font-medium text-white shadow-sm transition hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                        >
                            Reset Password
                        </button>
                    )}
                </div>
            </Modal.Footer>
        </Modal>
    );
};

export default EditModal;
