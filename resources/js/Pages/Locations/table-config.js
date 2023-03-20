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
            field: "name",
            label: "Name",
            options: {
                sort: true,
            },
        },
    ],
};

export default config;
