import React from "react";
import { Mail, Lock, Eye, Phone, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Signup = () => {
  const navigator = useNavigate();
    async function handleSignup(data) {
        try {
            const response = await fetch(import.meta.env.VITE_BACKEND_HOST+"/signup",{
                method:"POST",
                headers:{
                    "Content-type":"application/json"
                },
                body:JSON.stringify(data)
            });
            if(!response.ok){
                const data = await response.json();
                console.log(data)
                return;
            }

            toast.success("signup successful!",{position:"top-center",autoClose:5000});
        } catch (error) {
            //alert ("something went wrong!")
            console.log(error);
            
        }
    }
      function handleFormSubmit(e){
        e.preventDefault();
        const form= e.target;
        const name = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const password = form.password.value

        const data = {name, email, phone, password};

       console.log(data);
       handleSignup(data)
        
    }
    return (
        <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
                {/* Logo */}
                <Link to="/" contentEditable={false}>
                    <div className="text-center mb-8" contentEditable={false}>
                        <h1 className="text-5xl font-extrabold tracking-tight">
                            <span className="text-[#7fad39]">O</span>GANI
                        </h1>

                        <p className="text-gray-500 mt-3">
                            Welcome back! Please login to your account.
                        </p>
                    </div>
                </Link>


                {/* Form */}
                <form onSubmit={handleFormSubmit} className="space-y-5">

                    {/* Name */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Name
                        </label>

                        <div className="flex items-center border border-gray-300 rounded-xl px-4 focus-within:border-[#7fad39] transition">
                            <User size={18} className="text-gray-400" />

                            <input
                                type="text"
                                placeholder="Enter your name"
                                className="w-full px-3 py-4 outline-none bg-transparent"
                                name="name"
                            />
                        </div>
                    </div>


                    {/* Email */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Email Address
                        </label>

                        <div className="flex items-center border border-gray-300 rounded-xl px-4 focus-within:border-[#7fad39] transition">
                            <Mail size={18} className="text-gray-400" />

                            <input
                                type="email"
                                placeholder="Enter your email"
                                name="email"
                                className="w-full px-3 py-4 outline-none bg-transparent"
                            />
                        </div>
                    </div>


                    {/* Phone */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Phone
                        </label>

                        <div className="flex items-center border border-gray-300 rounded-xl px-4 focus-within:border-[#7fad39] transition">
                            <Phone size={18} className="text-gray-400" />

                            <input
                                type="text"
                                name="phone"
                                placeholder="Enter your phone"
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


                    {/* Login Button */}
                    <button onClick={handleSignup}
                        type="submit"
                        className="w-full bg-[#7fad39] hover:bg-[#6c992d] transition text-white py-4 rounded-xl font-semibold text-lg"
                    >
                        Signup
                    </button>
                </form>



                {/* Signup */}
                <p className="text-center text-gray-500 mt-8">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-[#7fad39] font-semibold hover:underline"
                    >
                        Login
                    </Link>

                </p>
            </div>
        </div>
    );
};

export default Signup;