import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/layout.jsx";
import ContactsView from "./pages/ContactsView.jsx";
import AddContactView from "./pages/AddContactView.jsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <ContactsView />
            },
            {
                path: "add-contact",
                element: <AddContactView />
            },
            {
                path: "edit-contact/:id",
                element: <AddContactView />
            }
        ]
    }
]);