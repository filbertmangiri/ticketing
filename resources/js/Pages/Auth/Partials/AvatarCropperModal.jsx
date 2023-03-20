import Modal from "@/Components/Modal";
import React, { forwardRef } from "react";
import { Cropper } from "react-cropper";
import "cropperjs/dist/cropper.css";

const AvatarCropperModal = forwardRef(({ modal, image, cropHandler }, ref) => {
    return (
        <Modal
            title="Crop profile picture"
            isOpen={modal.isOpen}
            close={modal.close}
        >
            <Modal.Body>
                <Cropper
                    ref={ref}
                    viewMode={1}
                    responsive={false}
                    src={image}
                    aspectRatio={1}
                    zoomTo={0.5}
                    background={false}
                    autoCropArea={1}
                    checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                    guides={true}
                    className="max-h-full"
                />
            </Modal.Body>

            <Modal.Footer className="flex gap-x-2">
                <button
                    type="button"
                    onClick={() => {
                        modal.close();
                        cropHandler();
                    }}
                    className="inline-flex justify-center rounded-md border border-transparent bg-green-700 py-2 px-4 text-sm font-medium text-white shadow-sm transition hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                    Save
                </button>

                <button
                    type="button"
                    onClick={() => {
                        modal.close();
                    }}
                    className="inline-flex justify-center rounded-md border border-transparent bg-gray-700 py-2 px-4 text-sm font-medium text-white shadow-sm transition hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                    Cancel
                </button>
            </Modal.Footer>
        </Modal>
    );
});

export default AvatarCropperModal;
