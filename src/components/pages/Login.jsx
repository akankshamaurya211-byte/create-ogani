import React from "react";
import { Mail, Lock, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Login = () => {

    const navigator= useNavigate();

    async function loginHandler(data) {
        try {
            let response = await fetch(import.meta.env.VITE_BACKEND_HOST+"/login",{
                method:"POST",
                headers:{
                    "content-type": "application/json"
                },
                body:JSON.stringify(data),
                credentials:"include"
            });

            if(!response.ok)
                return toast.error("Invalid credentails!",{position:"bottom-center"});

            toast.success("Logged in!", {position:"bottom-center"});
            navigator("/profile");

        } catch (error) {
            toast.error("Could not process your request at the moment please try again later!",{position:"bottom-center"});

        }
    }

    const formSubmitHandler= (e)=>{
        e.preventDefault();
        const credentails= {email: e.target.email.value, password: e.target.password.value}
        loginHandler(credentails)
    }
    return (
        <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
                {/* Logo */}
                <Link to="/">
                    <div className="text-center mb-8">
                        <h1 className="text-5xl font-extrabold tracking-tight">
                            <span className="text-[#7fad39]">O</span>GANI
                        </h1>

                        <p className="text-gray-500 mt-3">
                            Welcome back! Please login to your account.
                        </p>
                    </div>
                </Link>

                {/* Form */}
                <form onSubmit={formSubmitHandler} className="space-y-5">
                    {/* Email */}
                    <div>
                       
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Email Address
                        </label>

                        <div className="flex items-center border border-gray-300 rounded-xl px-4 focus-within:border-[#7fad39] transition">
                            <Mail size={18} className="text-gray-400" />

                            <input
                                name= "email"
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-3 py-4 outline-none bg-transparent"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Password
                        </label>

                        <div className="flex items-center border border-gray-300 rounded-xl px-4 focus-within:border-[#7fad39] transition">
                            <Lock size={18} className="text-gray-400" />

                            <input
                                name="password"
                                type="password"
                                placeholder="Enter your password"
                                className="w-full px-3 py-4 outline-none bg-transparent"
                            />


                        </div>
                    </div>

                    {/* Options */}
                    <div className="flex items-center justify-between text-sm">


                        <button
                            type="button"
                            className="text-[#7fad39] font-medium hover:underline"
                        >
                            Forgot Password?
                        </button>
                    </div>

                    {/* Login Button */}
                    <button onClick={()=> navigator("/profile")}
                        type="submit"
                        className="w-full bg-[#7fad39] hover:bg-[#6c992d] transition text-white py-4 rounded-xl font-semibold text-lg"
                    >
                        Login
                    </button>
                </form>



                {/* Signup */}
                <p className="text-center text-gray-500 mt-8">
                    Don’t have an account?{" "}
                    <Link to={"/signup"}>
                        <span className="text-[#7fad39] font-semibold cursor-pointer hover:underline">
                            Sign Up
                        </span>
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;