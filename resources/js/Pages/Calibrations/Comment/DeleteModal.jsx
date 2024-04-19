import Modal from "@/Components/Modal";
import { Toast } from "@/Helpers/Toast";
import { router } from "@inertiajs/react";

const DeleteModal = ({ isOpen, close, comment }) => {
    const deleteHandler = () => {
        router.delete(route("calibration_comment.destroy", comment.id), {
            preserveScroll: true,
            onSuccess: () => {
                close();
                Toast("success", "Comment successfully deleted");
            },
        });
    };

    return (
        <Modal title="Delete a comment" isOpen={isOpen} close={close}>
            <Modal.Body className="flex flex-col gap-y-3">
                Are you sure to delete this comment?
            </Modal.Body>

            <Modal.Footer className="flex gap-x-3">
                <button
                    type="button"
                    onClick={deleteHandler}
                    className="inline-flex justify-center rounded-md border border-transparent bg-red-700 py-2 px-4 text-sm font-medium text-white shadow-sm transition hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                    Delete
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

export default DeleteModal;
