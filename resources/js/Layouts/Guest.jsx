import GuestNavbar from "@/Components/Navigation/GuestNavbar";
import AppLayout from "./App";

const GuestLayout = ({ title, children }) => {
    return (
        <AppLayout title={title}>
            <div className="flex h-screen flex-col">
                <header>
                    <GuestNavbar />
                </header>

                <main className="px-responsive flex flex-grow py-5">
                    {children}
                </main>
            </div>
        </AppLayout>
    );
};

export default GuestLayout;
