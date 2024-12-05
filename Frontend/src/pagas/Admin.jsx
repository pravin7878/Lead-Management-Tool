import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/actions/auth";

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, seterror] = useState("")
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    console.log(auth);

    const handleLogin = (e) => {
        e.preventDefault();
        console.log("Login details", { email, password });
        if (!email) {
            seterror("email is require")
            return
        }
        if (!password || !password.length >= 6) {
            seterror("password is require and must be min length 6")
            return
        }
        seterror("")
        dispatch(loginUser({ url: `${import.meta.env.VITE_APP_BACKEND_URL}/user/login`, userData: { email, password } }))

    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-200" >
            <div className="bg-white shadow-xl rounded-lg p-8 max-w-md w-full">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
                    Admin Login
                </h2>
                {error && <p className="text-red-600 mb-3">{error}</p>}
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-600"
                        >
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 w-full px-4 py-2 border bg-gray-200 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="admin@example.com"
                        />
                    </div>

                    {/* Password Input */}
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium  text-gray-600"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 bg-gray-200 w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter your password"
                        />
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                        >
                            Login
                        </button>
                    </div>
                </form>

                {/* Forgot Password */}
                {/* <p className="mt-4 text-sm text-center text-gray-600">
                    Forgot your password?{" "}
                    <a
                        href="/reset-password"
                        className="text-blue-500 hover:underline"
                    >
                        Reset it here
                    </a>
                </p> */}
            </div>
        </div>
    );
};

export default AdminLogin;
