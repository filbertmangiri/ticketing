const config = {
    withActionColumn: true,
    defaults: {
        load: 10,
        sort: "number-desc",
    },
    columns: [
        {
            field: "",
            label: "",
        },
        {
            field: "number",
            label: "No.",
            options: {
                sort: true,
            },
        },
        {
            field: "status",
            label: "Status",
            options: {
                sort: true,
            },
        },
        {
            field: "priority",
            label: "Priority",
            options: {
                sort: true,
            },
        },
        {
            field: "created_at",
            label: "Submitted At",
            options: {
                sort: true,
            },
        },
        {
            field: "deadline_at",
            label: "Deadline",
            options: {
                sort: true,
            },
        },
        {
            field: "issuer",
            label: "Issuer",
            options: {
                sort: true,
            },
        },
        {
            field: "category",
            label: "Category",
            options: {
                sort: true,
            },
        },
        {
            field: "product",
            label: "Product",
            options: {
                sort: true,
            },
        },
        {
            field: "location",
            label: "Location",
            options: {
                sort: true,
            },
        },
        {
            field: "updated_at",
            label: "Last Updated",
            options: {
                sort: true,
            },
        },
        {
            field: "technician",
            label: "Technician",
            options: {
                sort: true,
            },
        },
    ],
};

export default config;
