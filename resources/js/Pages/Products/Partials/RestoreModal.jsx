import Modal from "@/Components/Modal";
import React from "react";

const RestoreModal = ({ isOpen, close, product, restoreHandler }) => {
    return (
        <Modal
            title={`Restore product - <b>${product.name}</b>`}
            isOpen={isOpen}
            close={close}
        >
            <Modal.Body className="flex flex-col gap-y-3">
                Are you sure to restore this product?
            </Modal.Body>

            <Modal.Footer className="flex gap-x-3">
                <button
                    type="button"
                    onClick={restoreHandler}
                    className="inline-flex justify-center rounded-md border border-transparent bg-yellow-700 py-2 px-4 text-sm font-medium text-white shadow-sm transition hover:bg-yellow-800 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                >
                    Restore
                </button>
                <button
                    type="button"
                    onClick={close}
                    className="inline-flex justify-center rounded-md border border-transparent bg-gray-700 py-2 px-4 text-sm font-medium text-white shadow-sm transition hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                    Cancel
                </button>
            </Modal.Footer>
        </Modal>
    );
};

export default RestoreModal;
