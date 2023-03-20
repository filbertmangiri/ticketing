import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Toast = (type, message) => {
    toast[type](message, {
        toastId: "login-toast",
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: document.documentElement.classList.contains("dark")
            ? "dark"
            : "light",
    });
};
