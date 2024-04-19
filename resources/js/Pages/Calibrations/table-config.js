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
            field: "title",
            label: "Title",
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
            field: "created_at",
            label: "Submitted At",
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
            field: "department",
            label: "For Department",
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
    ],
};

export default config;
