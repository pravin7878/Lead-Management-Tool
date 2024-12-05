import React from "react";
import { useNavigate } from "react-router-dom";


const Navbar = ({ user, onLogout,isLogged }) => {
const navigate = useNavigate()

    return (
        <nav className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center">
            <div className="text-lg font-bold">Lead Manager</div>
            {isLogged ? <div className="flex items-center space-x-4">
                <p>
                    Hello👋
                    <span className="font-bold"> {user.role === "admin" ? "Admin" : user.name}</span>
                </p>
                <button
                    onClick={onLogout}
                    className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
                >
                    Logout
                </button>
            </div>
                :
                <button
                    onClick={()=>navigate("/user/login")}
                    className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
                >
                    Login
                </button>
            }
        </nav>
    );
};
export default Navbar;
