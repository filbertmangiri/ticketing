import Checkbox from "@/Components/Form/Checkbox";
import Input from "@/Components/Form/Input";
import GuestLayout from "@/Layouts/Guest";
import {
    ExclamationTriangleIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

const Login = () => {
    const form = useForm({
        email_or_username: "",
        password: "",
        remember: false,
    });

    const submitHandler = (e) => {
        e.preventDefault();

        form.post(route("login"));
    };

    const inputHandler = (e) => {
        form.setData(
            e.target.name,
            e.target.type === "checkbox" ? e.target.checked : e.target.value
        );
    };

    useEffect(() => {
        if (form.errors.login) {
            form.reset("password");
        }
    }, [form.errors]);

    return (
        <div className="flex w-full items-center justify-center">
            <div className="h-fit w-full rounded-lg border border-gray-400 bg-gray-200 p-5 dark:border-gray-600 dark:bg-gray-800 sm:max-w-xs md:max-w-sm">
                <h1 className="text-center text-xl font-bold leading-tight tracking-tight sm:text-2xl">
                    Login to your account
                </h1>

                <form
                    onSubmit={submitHandler}
                    className="mt-10 flex flex-col gap-y-4"
                >
                    {form.errors.login && (
                        <Login.Error message={form.errors.login} />
                    )}

                    <Input>
                        <Input.Label>Email or username</Input.Label>
                        <Input.Field
                            name="email_or_username"
                            value={form.data.email_or_username}
                            onChange={inputHandler}
                        />
                        <Input.Errors errors={form.errors.email_or_username} />
                    </Input>

                    <Input>
                        <Input.Label>Password</Input.Label>
                        <Input.Field.Password
                            name="password"
                            value={form.data.password}
                            onChange={inputHandler}
                        />
                        <Input.Errors errors={form.errors.password} />
                    </Input>

                    <Checkbox>
                        <Checkbox.Field
                            id="remember"
                            name="remember"
                            checked={form.data.remember}
                            onChange={inputHandler}
                        />
                        <Checkbox.Label htmlFor="remember">
                            Remember me
                        </Checkbox.Label>
                    </Checkbox>

                    <button
                        type="submit"
                        disabled={form.processing}
                        className={`${
                            form.processing && "cursor-wait"
                        } mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white shadow transition duration-200 hover:bg-opacity-75 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-opacity-75`}
                    >
                        <span className="text-sm font-medium">
                            {form.processing ? "..." : "Login"}
                        </span>
                    </button>
                </form>
            </div>
        </div>
    );
};

Login.Error = ({ message }) => {
    const [show, setShow] = useState(true);

    return (
        show && (
            <div className="flex items-center border-t-4 border-red-300 bg-transparent p-4 text-red-800 dark:border-red-800 dark:text-red-400">
                <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />

                <div className="ml-3 text-sm font-medium">{message}</div>

                <button
                    onClick={() => setShow(false)}
                    type="button"
                    className="-mx-1.5 -my-1.5 ml-auto inline-flex h-8 w-8 rounded-lg p-1.5 text-red-500 hover:bg-gray-300 focus:ring-2 focus:ring-red-400 dark:text-red-400 dark:hover:bg-gray-700"
                >
                    <XMarkIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                </button>
            </div>
        )
    );
};

Login.layout = (page) => <GuestLayout children={page} title="Login" />;

export default Login;
