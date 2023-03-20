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
            field: "sub_departments_count",
            label: "Sub Departments",
            options: {
                sort: true,
            },
        },
        {
            field: "users_count",
            label: "Users",
            options: {
                sort: true,
            },
        },
    ],
};

export default config;
