import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { mockUsers } from "../mockData/mockUsers";

const Login = () => {
    const [userName, setUserName] = useState("AdminUser");
    const [password, setPassword] = useState("admin123");
    const [loginStatus, setLoginStatus] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = mockUsers.find(
            (u) => u.userName === userName && u.password === password
        );
        if (user) {
            dispatch(login({
                userRole: user.role,
                userId: user.userId,
                userName: user.userName,
                loggedIn: true
            }));
            setLoginStatus("Logged in successfully!");
            setTimeout(() => {
                navigate('/');
            }, 1000);
        } else {
            setLoginStatus("Invalid username or password. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-teal-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Sign in to your account
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <input type="hidden" name="remember" value="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="userName" className="sr-only">
                                Username
                            </label>
                            <input
                                id="userName"
                                name="userName"
                                type="text"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Username"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                        >
                            Sign in
                        </button>
                    </div>
                </form>
                {loginStatus && (
                    <div className={`mt-4 text-center ${loginStatus.includes("successfully") ? "text-green-600" : "text-red-600"} font-semibold`}>
                        {loginStatus}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Login;