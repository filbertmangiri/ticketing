import React, { useEffect } from "react";

const Test = ({ users }) => {
    useEffect(() => {
        console.log(users);
    }, []);

    return <div>Test</div>;
};

export default Test;
