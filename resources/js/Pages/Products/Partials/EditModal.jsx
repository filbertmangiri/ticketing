import Input from "@/Components/Form/Input";
import Radio from "@/Components/Form/Radio";
import Select from "@/Components/Form/Select";
import TextArea from "@/Components/Form/TextArea";
import Modal from "@/Components/Modal";
import { Toast } from "@/Helpers/Toast";
import { useForm } from "@inertiajs/react";
import { useEffect } from "react";

const EditModal = ({ isOpen, close, product, categories }) => {
    const form = useForm({
        name: "",
        description: "",
        category: "",
    });

    useEffect(() => {
        form.setData({
            ...form.data,
            name: product.name,
            description: product.description,
            category: {
                value: product.category?.id,
                label: product.category?.name,
            },
        });

        form.setDefaults({
            name: product.name,
            description: product.description,
            category: {
                value: product.category?.id,
                label: product.category?.name,
            },
        });
    }, [product]);

    const submitHandler = (e) => {
        e.preventDefault();

        form.put(route("product.update", product.slug), {
            preserveScroll: true,
            onSuccess: () => {
                close();
                form.reset();
                Toast("success", "Product successfully updated");
            },
        });
    };

    const inputHandler = (e) => {
        form.setData(e.target.name, e.target.value);
    };

    return (
        <Modal
            title={`Edit a product - <b>${product.name}</b>`}
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

                <Input.Label>Category</Input.Label>
                <Select
                    options={categories.map((category) => ({
                        value: category.id,
                        label: category.name,
                    }))}
                    value={form.data.category}
                    onChange={(value) => {
                        form.setData("category", value);
                    }}
                    isSearchable={true}
                />
                <Input.Errors errors={form.errors.category_id} />
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
