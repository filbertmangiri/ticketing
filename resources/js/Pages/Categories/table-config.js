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
        {
            field: "products_count",
            label: "Products",
            options: {
                sort: true,
            },
        },
    ],
};

export default config;
