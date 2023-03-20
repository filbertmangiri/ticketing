import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";

const Modal = ({ title, isOpen, close, children }) => {
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={close}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-50" />
                </Transition.Child>

                <div className="custom-scrollbar fixed inset-0 overflow-y-auto">
                    <div className="flex h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="flex max-h-full w-full max-w-prose transform flex-col overflow-hidden rounded-2xl border border-gray-400 bg-gray-200 text-left align-middle text-black shadow-xl transition-all dark:border-gray-600 dark:bg-gray-800 dark:text-white">
                                <Dialog.Title
                                    as="div"
                                    className="border-b border-gray-400 p-6 text-lg font-medium leading-6 dark:border-gray-600"
                                    dangerouslySetInnerHTML={{
                                        __html: title,
                                    }}
                                />

                                {children}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

Modal.Body = ({
    wrapperClassName = "",
    className = "",
    children,
    ...props
}) => {
    return (
        <div
            className={`${wrapperClassName} custom-scrollbar flex-grow overflow-y-auto`}
            {...props}
        >
            <div className={`${className} p-6`}>{children}</div>
        </div>
    );
};

Modal.Footer = ({ className = "", children, ...props }) => {
    return (
        <div
            className={`${className} border-t border-gray-400 p-6 dark:border-gray-600`}
            {...props}
        >
            {children}
        </div>
    );
};

export default Modal;
