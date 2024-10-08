import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { login } from './store/authSlice';
import routers from "./pages/Routing";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        const authState = localStorage.getItem('authState');
        if (authState) {
            const parsedAuthState = JSON.parse(authState);
            dispatch(login(parsedAuthState));
        }
    }, [dispatch]);

    return <RouterProvider router={routers} />;
}

export default App;