import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

// import actions
import { registerNewUser} from "../../store/actions/auth";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { resetState } from '../../store/slices/authSlice';

const Register = () => {
    const dispatch = useDispatch();
    const state = useSelector(state => state.auth);
    console.log(state);
    
    const { error: errorMessage, isLoading, isRegister } = useSelector(state => state.auth);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        mobileNumber: '',
    });

    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const mobileNumberRef = useRef(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.name === "") {
            setError("Name is required");
            nameRef.current.focus();
            return;
        }
        if (formData.email === "") {
            setError("Email is required");
            emailRef.current.focus();
            return;
        }
        if (formData.password === "" || formData.password.length < 6) {
            setError("Password is required and should be at least 6 characters");
            passwordRef.current.focus();
            return;
        }
        if (formData.mobileNumber === "" || formData.mobileNumber.length !== 10) {
            setError("Mobile Number is required and should be 10 digits");
            mobileNumberRef.current.focus();
            return;
        }

        dispatch(registerNewUser({ url: `${import.meta.env.VITE_APP_BACKEND_URL}/user/register`, userData: formData }));

        setError("");
        
    };

    const hendelNevigateTologin = ()=>{
        dispatch(resetState())
        navigate("/user/login")
    }


    useEffect(() => {
        nameRef.current.focus();
    }, []);
    console.log(state);

    useEffect(() => {
        if (isRegister) {
            toast.success("Registration successful!");
            setFormData({
                name: '',
                email: '',
                password: '',
                mobileNumber: '',
            });
            setTimeout(()=>{
                navigate("/user/login", { replace: true });
            },3000)
        }
        if (errorMessage) {
            toast.error(errorMessage.message);
        }
    }, [isRegister, errorMessage, navigate]);
    console.log(state);

    

    return (
        <div className="flex justify-center items-center h-screen bg-gray-200">
            <div className="flex flex-col w-[90%] bg-white p-6 rounded-lg shadow-lg h-[80%] md:w-[45%]">
                <h2 className="text-2xl font-bold mb-4 text-center">Register Now</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <label className="block mb-2 font-bold text-[12px]">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-2 py-1 mb-4 border rounded"
                        placeholder="Enter your name"
                        ref={nameRef}
                    />
                    <label className="block font-bold mb-2 text-[12px]">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-2 py-1 mb-4 border rounded"
                        placeholder="Enter your email"
                        ref={emailRef}
                    />
                    <label className="block font-bold mb-2 text-[12px]">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-2 py-1 mb-4 border rounded"
                        ref={passwordRef}
                        placeholder="Enter your password"
                    />
                    <label className="block font-bold mb-2 text-[12px]">Mobile Number</label>
                    <input
                        type="number"
                        name="mobileNumber"
                        value={formData.mobileNumber}
                        onChange={handleChange}
                        className="w-full px-2 py-1 mb-4 border rounded"
                        placeholder="Enter your Mobile Number"
                        ref={mobileNumberRef}
                    />
                    <button
                        disabled={isLoading}
                        className={`relative flex items-center justify-center w-[100%] px-4 py-2 text-white font-medium rounded ${isLoading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700"
                            }`}
                    >
                        {isLoading ? (
                            <>
                                <div className="animate-spin border-2 border-t-transparent border-white rounded-full w-4 h-4 mr-2"></div>
                                Registering...
                            </>
                        ) : (
                            "Register"
                        )}
                    </button>
                </form>
                <p className="mt-4 text-sm text-center">
                    Already have an account?{' '}
                    <span onClick={hendelNevigateTologin} className="text-blue-600 underline cursor-pointer">Login here</span>
                </p>
            </div>
        </div>
    );
};

export default Register;
