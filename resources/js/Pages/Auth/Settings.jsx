import Input from "@/Components/Form/Input";
import Radio from "@/Components/Form/Radio";
import { Toast } from "@/Helpers/Toast";
import useModal from "@/Hooks/useModal";
import DashboardLayout from "@/Layouts/Dashboard";
import { Cog6ToothIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useForm } from "@inertiajs/react";
import { createRef, useEffect, useRef, useState } from "react";
import AvatarCropperModal from "./Partials/AvatarCropperModal";
import ResetPassword from "./ResetPassword";

const Settings = ({ userResource }) => {
    const { data: user } = userResource;

    const form = useForm({
        email: "",
        username: "",
        phone: "",
        gender: "",
        profile_picture: null,
    });

    useEffect(() => {
        form.setData({
            ...form.data,
            email: user.email,
            username: user.username,
            phone: user.phone,
            gender: user.gender?.value,
            profile_picture: null,
        });

        form.setDefaults({
            email: user.email,
            username: user.username,
            phone: user.phone,
            gender: user.gender?.value,
            profile_picture: null,
        });
    }, []);

    const submitHandler = (e) => {
        e.preventDefault();

        form.post(route("account.update", user.username), {
            preserveScroll: true,
            onSuccess: () => {
                form.reset();
                Toast("success", "Account successfully updated");
            },
        });
    };

    const inputHandler = (e) => {
        form.setData(e.target.name, e.target.value);
    };

    /* Avatar Crop */
    const profilePictureInputRef = useRef();

    const cropModal = useModal();

    const [image, setImage] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null);

    const cropperRef = createRef();

    const onImageChange = (e) => {
        e.preventDefault();

        cropModal.open();

        let files;

        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }

        const reader = new FileReader();

        reader.onload = () => {
            setImage(reader.result);
        };

        reader.readAsDataURL(files[0]);
    };

    const cropHandler = () => {
        if (typeof cropperRef.current?.cropper !== "undefined") {
            cropperRef.current?.cropper.getCroppedCanvas().toBlob((blob) => {
                form.setData({
                    ...form.data,
                    profile_picture: blob,
                });
            });

            setCroppedImage(
                cropperRef.current?.cropper.getCroppedCanvas().toDataURL()
            );
        }
    };

    return (
        <div className="flex h-fit w-full flex-col gap-y-5">
            <div className="flex h-fit flex-col justify-between gap-y-20 rounded-lg border border-gray-300 bg-gray-200 p-4 dark:border-gray-700 dark:bg-gray-800">
                <div className="flex flex-col gap-y-10">
                    <div className="flex items-center gap-x-4 text-xl">
                        <Cog6ToothIcon className="h-6 w-6 stroke-2" />
                        <span>Account Settings</span>
                    </div>

                    <div className="flex flex-col gap-y-5">
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            ref={profilePictureInputRef}
                            onChange={onImageChange}
                        />

                        <div className="flex flex-col items-center gap-3">
                            <div className="flex items-end">
                                <img
                                    src={
                                        form.data.profile_picture ||
                                        croppedImage
                                            ? croppedImage
                                            : user.profile_picture
                                    }
                                    className="h-32 w-32 rounded-full ring-2 ring-gray-100 transition-all hover:opacity-70 dark:ring-gray-900"
                                    alt="Upload profile picture"
                                    role="button"
                                    onClick={() => {
                                        profilePictureInputRef.current.click();
                                    }}
                                />

                                {form.data.profile_picture && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            form.setData(
                                                "profile_picture",
                                                null
                                            );
                                            setCroppedImage(null);
                                        }}
                                        className="rounded-md p-1 transition-all hover:bg-gray-400 dark:hover:bg-gray-900"
                                    >
                                        <TrashIcon className="h-4 w-4 stroke-2 text-red-600 dark:text-red-400" />
                                    </button>
                                )}
                            </div>

                            <Input.Errors
                                errors={form.errors.profile_picture}
                            />
                        </div>

                        <AvatarCropperModal
                            modal={cropModal}
                            cropHandler={cropHandler}
                            ref={cropperRef}
                            image={image}
                        />

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
                                inline={true}
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
                    </div>
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

            <ResetPassword />
        </div>
    );
};

Settings.layout = (page) => (
    <DashboardLayout children={page} title="Account Settings" />
);

export default Settings;
