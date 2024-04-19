import Modal from "@/Components/Modal";
import { Toast } from "@/Helpers/Toast";
import { router } from "@inertiajs/react";

const CloseModal = ({ isOpen, close, calibration }) => {
    const closeHandler = () => {
        router.patch(
            route("calibration.close", calibration.number),
            {},
            {
                preserveScroll: true,
                onSuccess: () => {
                    close();
                    Toast("success", "Calibration successfully closed");
                },
            }
        );
    };

    return (
        <Modal
            title={`Close calibration - <b>${calibration.number}</b>`}
            isOpen={isOpen}
            close={close}
        >
            <Modal.Body className="flex flex-col gap-y-3">
                Are you sure to close this calibration?
            </Modal.Body>

            <Modal.Footer className="flex gap-x-3">
                <button
                    type="button"
                    onClick={closeHandler}
                    className="inline-flex justify-center rounded-md border border-transparent bg-red-700 py-2 px-4 text-sm font-medium text-white shadow-sm transition hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
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

export default CloseModal;
