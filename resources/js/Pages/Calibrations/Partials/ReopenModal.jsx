import Modal from "@/Components/Modal";
import { Toast } from "@/Helpers/Toast";
import { router } from "@inertiajs/react";
import React from "react";

const ReopenModal = ({ isOpen, close, calibration }) => {
    const reopenHandler = () => {
        router.patch(
            route("calibration.reopen", calibration.number),
            {},
            {
                preserveScroll: true,
                onSuccess: () => {
                    close();
                    Toast("success", "Calibration successfully re-opened");
                },
            }
        );
    };

    return (
        <Modal
            title={`Re-open calibration - <b>${calibration.number}</b>`}
            isOpen={isOpen}
            close={close}
        >
            <Modal.Body className="flex flex-col gap-y-3">
                Are you sure to re-open this calibration?
            </Modal.Body>

            <Modal.Footer className="flex gap-x-3">
                <button
                    type="button"
                    onClick={reopenHandler}
                    className="inline-flex justify-center rounded-md border border-transparent bg-green-700 py-2 px-4 text-sm font-medium text-white shadow-sm transition hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                    Yes
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

export default ReopenModal;
