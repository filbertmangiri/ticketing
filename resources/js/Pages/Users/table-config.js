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
            field: "email",
            label: "Email",
            options: {
                sort: true,
            },
        },
        {
            field: "username",
            label: "Username",
            options: {
                sort: true,
            },
        },
        {
            field: "phone",
            label: "Phone",
            options: {
                sort: true,
            },
        },
        {
            field: "gender",
            label: "Gender",
            options: {
                sort: true,
            },
        },
        {
            field: "department",
            label: "Department",
            options: {
                sort: true,
            },
        },
        {
            field: "sub_department",
            label: "Sub Department",
            options: {
                sort: true,
            },
        },
    ],
};

export default config;
