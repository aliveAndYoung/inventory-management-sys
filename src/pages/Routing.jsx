import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/shared/Layout";
import Login from "./Login";
import Dashboard from "./Dashboard";
import InventoryList from "./InventoryList";
import ItemForm from "./ItemForm";
import OrdersManagement from "./OrdersManagement";
import SuppliersManagement from "./SuppliersManagement";
import Reports from "./Reports";
import Settings from "./Settings";

const routers = createBrowserRouter([
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Dashboard />,
            },
            {
                path: "/inventory",
                element: <InventoryList />,
            },
            {
                path: "/item/:id?",
                element: <ItemForm />,
            },
            {
                path: "/orders",
                element: <InventoryList />,
            },
            {
                path: "/suppliers",
                element: <SuppliersManagement />,
            },
            {
                path: "/reports",
                element: <Reports />,
            },
            {
                path: "/settings",
                element: <Settings />,
            },
            {
                path: "/profile",
                element: <OrdersManagement />,
            },
        ],
    },
]);

export default routers;
