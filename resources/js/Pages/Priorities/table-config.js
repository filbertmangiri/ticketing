const config = {
    withActionColumn: true,
    defaults: {
        load: 10,
        sort: "deadline_days-desc",
    },
    columns: [
        {
            field: "id",
            label: "ID",
            options: {
                sort: true,
            },
        },
        {
            field: "name",
            label: "Name",
            options: {
                sort: true,
            },
        },
        {
            field: "deadline_days",
            label: "Deadline",
            options: {
                sort: true,
            },
        },
    ],
};

export default config;
