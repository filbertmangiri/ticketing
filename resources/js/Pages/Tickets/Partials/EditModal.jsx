import Editor from "@/Components/Form/Editor";
import Input from "@/Components/Form/Input";
import Select from "@/Components/Form/Select";
import Modal from "@/Components/Modal";
import { Toast } from "@/Helpers/Toast";
import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

const EditModal = ({
    isOpen,
    close,
    ticket,
    categories,
    locations,
    priorities,
}) => {
    const form = useForm({
        title: "",
        body: "",
        category: null,
        product: null,
        location: null,
        priority: null,
    });

    useEffect(() => {
        form.setData({
            ...form.data,
            title: ticket.title || "",
            body: ticket.body || "",
            category: {
                value: ticket.category?.id,
                label: ticket.category?.name,
            },
            product: {
                value: ticket.product?.id,
                label: ticket.product?.name,
            },
            location: {
                value: ticket.location?.id,
                label: ticket.location?.name,
            },
            priority: {
                value: ticket.priority?.id,
                label: ticket.priority?.name,
            },
        });

        form.setDefaults({
            title: ticket.title || "",
            body: ticket.body || "",
            category: {
                value: ticket.category?.id,
                label: ticket.category?.name,
            },
            product: {
                value: ticket.product?.id,
                label: ticket.product?.name,
            },
            location: {
                value: ticket.location?.id,
                label: ticket.location?.name,
            },
            priority: {
                value: ticket.priority?.id,
                label: ticket.priority?.name,
            },
        });
    }, []);

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

    const submitHandler = (e) => {
        e.preventDefault();

        form.put(route("ticket.update", ticket.number), {
            preserveScroll: true,
            onSuccess: () => {
                close();
                form.reset();
                Toast("success", "Ticket successfully updated");
            },
        });
    };

    const inputHandler = (e) => {
        form.setData(e.target.name, e.target.value);
    };

    return (
        <Modal
            title={`Edit a ticket - <b>${ticket.number}</b>`}
            isOpen={isOpen}
            close={close}
        >
            <Modal.Body className="flex flex-col gap-y-3">
                <div className="flex flex-col gap-y-6">
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
                    <div className="flex gap-x-3">
                        <div className="w-full">
                            <Input.Label>Location</Input.Label>
                            <Select
                                options={locations.map((location) => ({
                                    value: location.id,
                                    label: location.name,
                                }))}
                                value={form.data.location}
                                onChange={(value) => {
                                    form.setData("location", value);
                                }}
                                isSearchable={true}
                                menuAbsolute={true}
                            />
                            <Input.Errors errors={form.errors.location_id} />
                        </div>
                        <div className="w-full">
                            <Input.Label>Priority</Input.Label>
                            <Select
                                options={priorities.map((priority) => ({
                                    value: priority.id,
                                    label: priority.name,
                                }))}
                                value={form.data.priority}
                                onChange={(value) => {
                                    form.setData("priority", value);
                                }}
                                isSearchable={true}
                                menuAbsolute={true}
                            />
                            <Input.Errors errors={form.errors.priority_id} />
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
                </div>
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
