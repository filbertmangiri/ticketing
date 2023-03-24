const config = {
    withActionColumn: true,
    defaults: {
        load: 10,
        sort: "id-asc",
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
            field: "title",
            label: "Title",
            options: {
                sort: true,
            },
        },
        {
            field: "type",
            label: "Type",
            options: {
                sort: true,
            },
        },
    ],
};

export default config;
