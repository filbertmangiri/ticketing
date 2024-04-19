import AttachmentItem from "@/Components/AttachmentItem";
import Editor from "@/Components/Form/Editor";
import Input from "@/Components/Form/Input";
import Select from "@/Components/Form/Select";
import DashboardLayout from "@/Layouts/Dashboard";
import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

const Create = ({ departments, categories, ...props }) => {
    const form = useForm({
        title: "",
        body: "",
        department: null,
        attachments: [],
    });

    const [products, setProducts] = useState([]);

    const fetchProducts = (category) => {
        if (category) {
            axios
                .get(route("category.fetchProducts", category.value))
                .then((res) => {
                    setProducts(res.data);
                });
        }
    };

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

    useEffect(() => {
        form.setData("attachments", [
            ...form.data.attachments,
            ...acceptedFiles,
        ]);
    }, [acceptedFiles]);

    const submitHandler = async (e) => {
        e.preventDefault();

        form.post(route("calibration.store"), {
            preserveScroll: true,
            onSuccess: () => {
                close();
                form.reset();
            },
        });
    };

    const inputHandler = (e) => {
        form.setData(e.target.name, e.target.value);
    };

    const deleteAttachmentHandler = (index) => {
        form.setData(
            "attachments",
            form.data.attachments.filter(function (_, arrIndex) {
                return index !== arrIndex;
            })
        );
    };

    return (
        <div className="flex h-fit min-h-full w-full flex-col justify-between gap-y-6 rounded-lg border border-gray-300 bg-gray-200 p-4 dark:border-gray-700 dark:bg-gray-800">
            <div className="flex flex-col gap-y-6">
                <div className="w-full">
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
                        menuAbsolute={true}
                    />
                    <Input.Errors errors={form.errors.department_id} />
                </div>

                <div className="flex gap-x-3">
                    <div className="w-full">
                        <Input.Label>Category</Input.Label>
                        <Select
                            options={categories.map((category) => ({
                                value: category.id,
                                label: category.name,
                            }))}
                            value={form.data.category}
                            onChange={(value) => {
                                fetchProducts(value);

                                form.setData({
                                    ...form.data,
                                    category: value,
                                    product: null,
                                });
                            }}
                            isSearchable={true}
                            menuAbsolute={true}
                        />
                        <Input.Errors errors={form.errors.category_id} />
                    </div>

                    <div className="w-full">
                        <Input.Label>Product</Input.Label>
                        <Select
                            options={products.map((product) => ({
                                value: product.id,
                                label: product.name,
                            }))}
                            value={form.data.product}
                            onChange={(value) => {
                                form.setData("product", value);
                            }}
                            isSearchable={true}
                            menuAbsolute={true}
                        />
                        <Input.Errors errors={form.errors.product_id} />
                    </div>
                </div>

                <Input className="w-full">
                    <Input.Label>Subject</Input.Label>
                    <Input.Field
                        name="title"
                        value={form.data.title}
                        onChange={inputHandler}
                    />
                    <Input.Errors errors={form.errors.title} />
                </Input>

                <div>
                    <Input.Label>Description</Input.Label>
                    <Editor data={form.data.body} setData={form.setData} />
                    <Input.Errors errors={form.errors.body} />
                </div>

                <section className="container">
                    <Input.Label>Attachments</Input.Label>
                    <div
                        {...getRootProps({
                            className:
                                "dropzone relative cursor-pointer rounded-lg border border-dashed border-gray-500 transition-colors hover:border-blue-600 dark:hover:border-blue-400",
                        })}
                    >
                        <input
                            {...getInputProps({
                                className:
                                    "relative block h-full w-full cursor-pointer p-20 opacity-0",
                            })}
                        />
                        <p className="m-auto p-10 text-center">
                            Drag 'n' drop some files here, or click to select
                            files
                        </p>
                    </div>
                    <ul className="mt-4 flex w-full flex-1 flex-wrap gap-2">
                        {form.data.attachments?.length > 0 ? (
                            form.data.attachments.map((attachment, index) => {
                                const file = {
                                    path: URL.createObjectURL(attachment),
                                    name: attachment.name,
                                    size: attachment.size,
                                    mime_type: attachment.type,
                                };

                                return (
                                    <AttachmentItem
                                        key={`attachment-${index}`}
                                        index={index}
                                        attachment={file}
                                        deleteHandler={deleteAttachmentHandler}
                                        error={
                                            form.errors["attachments." + index]
                                        }
                                    />
                                );
                            })
                        ) : (
                            <li className="flex h-full w-full flex-col items-center justify-center text-center">
                                <img
                                    className="mx-auto w-32"
                                    src="https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png"
                                    alt="no data"
                                />
                                <span className="text-small text-gray-500">
                                    No files selected
                                </span>
                            </li>
                        )}
                    </ul>
                </section>
            </div>

            <div className="mt-10 flex gap-2 max-sm:flex-col">
                <button
                    type="button"
                    onClick={submitHandler}
                    disabled={form.processing}
                    className={`${
                        form.processing && "cursor-wait"
                    } inline-flex justify-center rounded-md border border-transparent bg-green-700 py-2 px-4 text-sm font-medium text-white shadow-sm transition hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:w-fit`}
                >
                    {form.processing ? "..." : "Create"}
                </button>

                <button
                    type="button"
                    onClick={() => {
                        form.reset();
                        form.clearErrors();
                    }}
                    className="inline-flex justify-center rounded-md border border-transparent bg-gray-700 py-2 px-4 text-sm font-medium text-white shadow-sm transition hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 sm:w-fit"
                >
                    Clear
                </button>
            </div>
        </div>
    );
};

Create.layout = (page) => (
    <DashboardLayout children={page} title="Create Calibration" />
);

export default Create;
