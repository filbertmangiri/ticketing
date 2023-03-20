import Input from "@/Components/Form/Input";
import Select from "@/Components/Form/Select";
import TextArea from "@/Components/Form/TextArea";
import Modal from "@/Components/Modal";
import { Toast } from "@/Helpers/Toast";
import { useForm } from "@inertiajs/react";

const CreateModal = ({
    isOpen,
    close,
    categories,
    selectedCategory = null,
}) => {
    const form = useForm({
        name: "",
        description: "",
        category: selectedCategory
            ? {
                  value: selectedCategory.id,
                  label: selectedCategory.name,
              }
            : null,
    });

    const submitHandler = (e) => {
        e.preventDefault();

        form.post(route("product.store"), {
            preserveScroll: true,
            onSuccess: () => {
                close();
                form.reset();
                Toast("success", "Product successfully created");
            },
        });
    };

    const inputHandler = (e) => {
        form.setData(e.target.name, e.target.value);
    };

    return (
        <Modal title="Create a new product" isOpen={isOpen} close={close}>
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
                    {form.processing ? "..." : "Create"}
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

export default CreateModal;
