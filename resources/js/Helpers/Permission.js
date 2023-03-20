import { usePage } from "@inertiajs/react";

export const can = (permission) => {
    const { permissions } = usePage().props;

    return permissions && permissions.includes(permission);
};
