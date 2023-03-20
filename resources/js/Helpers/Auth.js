import { usePage } from "@inertiajs/react";

export const auth = () => {
    const { auth } = usePage().props;

    return auth || null;
};
