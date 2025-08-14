import { Outlet } from "react-router-dom";
import { ContactProvider } from "../context/ContactContext";

const Layout = () => {
    return (
        <ContactProvider>
            <div className="min-h-screen">
                <Outlet />
            </div>
        </ContactProvider>
    );
};

export default Layout;
