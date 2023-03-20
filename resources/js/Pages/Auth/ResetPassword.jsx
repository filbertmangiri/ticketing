import Input from "@/Components/Form/Input";
import { auth } from "@/Helpers/Auth";
import { Toast } from "@/Helpers/Toast";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import { useForm } from "@inertiajs/react";
import React from "react";

const ResetPassword = () => {
    const { user } = auth();

    const form = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const inputHandler = (e) => {
        form.setData(e.target.name, e.target.value);
    };

    const submitHandler = (e) => {
        e.preventDefault();

        form.post(route("account.password.update", user.username), {
            preserveScroll: true,
            onSuccess: () => {
                Toast("success", "Password successfully updated");
            },
        });

        form.reset();
    };

    return (
        <div className="flex h-fit flex-col justify-between gap-y-10 rounded-lg border border-gray-300 bg-gray-200 p-4 dark:border-gray-700 dark:bg-gray-800">
            <div className="flex items-center gap-x-4 text-xl">
                <LockClosedIcon className="h-6 w-6 stroke-2" />
                <span>Reset Password</span>
            </div>

            <div className="flex flex-col gap-y-5">
                <Input>
                    <Input.Label>Current Password</Input.Label>
                    <Input.Field.Password
                        name="current_password"
                        value={form.data.current_password}
                        onChange={inputHandler}
                        autoComplete="off"
                    />
                    <Input.Errors errors={form.errors.current_password} />
                </Input>
                <Input>
                    <Input.Label>New Password</Input.Label>
                    <Input.Field.Password
                        name="password"
                        value={form.data.password}
                        onChange={inputHandler}
                        autoComplete="off"
                    />
                    <Input.Errors errors={form.errors.password} />
                </Input>
                <Input>
                    <Input.Label>Confirm Password</Input.Label>
                    <Input.Field.Password
                        name="password_confirmation"
                        value={form.data.password_confirmation}
                        onChange={inputHandler}
                        autoComplete="off"
                    />
                    <Input.Errors errors={form.errors.password_confirmation} />
                </Input>
            </div>

            <div className="flex gap-2 max-sm:flex-col">
                <button
                    type="button"
                    onClick={submitHandler}
                    disabled={form.processing}
                    className={`${
                        form.processing && "cursor-wait"
                    } inline-flex justify-center rounded-md border border-transparent bg-green-700 py-2 px-4 text-sm font-medium text-white shadow-sm transition hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:w-fit`}
                >
                    {form.processing ? "..." : "Save"}
                </button>

                <button
                    type="button"
                    onClick={() => {
                        form.reset();
                        form.clearErrors();
                    }}
                    className="inline-flex justify-center rounded-md border border-transparent bg-gray-700 py-2 px-4 text-sm font-medium text-white shadow-sm transition hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 sm:w-fit"
                >
                    Reset
                </button>
            </div>
        </div>
    );
};

export default ResetPassword;
