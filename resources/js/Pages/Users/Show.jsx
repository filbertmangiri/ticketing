import DashboardLayout from "@/Layouts/Dashboard";
import { Head } from "@inertiajs/react";
import React from "react";

const Show = ({ userResource }) => {
    const { data: user } = userResource;

    return (
        <>
            <Head title={`User - ${user.name}`}></Head>

            <div className="flex w-full gap-4 max-md:flex-col">
                <div className="flex h-fit flex-col items-center gap-y-3 rounded-lg border border-gray-300 bg-gray-200 p-4 dark:border-gray-700 dark:bg-gray-800">
                    <img
                        className="inline-block h-36 w-36 rounded-full ring-2 ring-white dark:ring-gray-800"
                        src={user.profile_picture}
                        alt="Image Description"
                    />
                </div>

                <div className="flex h-fit flex-grow flex-col gap-y-5 rounded-lg border border-gray-300 bg-gray-200 p-4 dark:border-gray-700 dark:bg-gray-800">
                    <div className="flex flex-col gap-y-1">
                        <span className="text-gray-500 dark:text-gray-400">
                            Name :
                        </span>
                        <span className="text-gray-900 dark:text-gray-100">
                            {user.name}
                        </span>
                    </div>

                    <div className="flex flex-col gap-y-1">
                        <span className="text-gray-500 dark:text-gray-400">
                            Username :
                        </span>
                        <span className="text-gray-900 dark:text-gray-100">
                            {user.username}
                        </span>
                    </div>

                    <div className="flex flex-col gap-y-1">
                        <span className="text-gray-500 dark:text-gray-400">
                            Email :
                        </span>
                        <span className="text-gray-900 dark:text-gray-100">
                            {user.email}
                        </span>
                    </div>

                    <div className="flex flex-col gap-y-1">
                        <span className="text-gray-500 dark:text-gray-400">
                            Phone :
                        </span>
                        <span className="text-gray-900 dark:text-gray-100">
                            {user.phone || "-"}
                        </span>
                    </div>

                    <div className="flex flex-col gap-y-1">
                        <span className="text-gray-500 dark:text-gray-400">
                            Department :
                        </span>
                        <span className="text-gray-900 dark:text-gray-100">
                            {user.department?.name || "-"}
                        </span>
                    </div>

                    <div className="flex flex-col gap-y-1">
                        <span className="text-gray-500 dark:text-gray-400">
                            Sub Department :
                        </span>
                        <span className="text-gray-900 dark:text-gray-100">
                            {user.sub_department?.name || "-"}
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
};

Show.layout = (page) => <DashboardLayout children={page} />;

export default Show;
