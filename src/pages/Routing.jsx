import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "../components/shared/Layout";
import Login from "./Login";
import Dashboard from "./Dashboard";
import InventoryList from "./InventoryList";
import SuppliersManagement from "./SuppliersManagement";
import Reports from "./Reports";
import ProtectedRoute from "./ProtectedRoute";
import CategoriesManagement from "./CategoriesManagement";
import UserManagement from "./UserManagement";

const routers = createBrowserRouter([
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/",
        element: <ProtectedRoute />,
        children: [
            {
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
                        path: "/manage-categories",
                        element: <CategoriesManagement />,
                    },

                    {
                        path: "/manage-suppliers",
                        element: <SuppliersManagement />,
                    },
                    {
                        path: "/reports",

                        element: <Reports />,
                    },
                    {
                        path: "/manage-users",
                        element: <UserManagement />,
                    },
                ],
            },
        ],
    },
    {
        path: "*",
        element: <Navigate to="/" replace />,
    },
]);

export default routers;
