import React, { useState } from "react";
import authService from "../appwrite/auth";
import { login as storeLogin } from "../store/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { Input, Logo, Button } from "./index";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();
    const [error, setError] = useState(null);

    const create = async (data) => {
        setError("");
        try {
            const account = await authService.createAccount(data);
            if (account) {
                const userData = await authService.getCurrentUser();
                if (userData){
                    dispatch(storeLogin(userData));
                    navigate("/");
                } 
            }
        } catch (error) {
            setError(error?.message || "Something went wrong");
        }
    };
    return (
        <div className="flex item-center justify-center">
            <div
                className={`mx-auto  w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
            >
                <div className="mb-2 flex justify-center">
                    <span className="w-full inline-block max-w-[100px]">
                        <Logo width="100px" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-light">
                    Sign up to your account
                </h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have and account&nbsp;
                    <Link
                        to={`/login`}
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign in
                    </Link>
                </p>

                {/* Display Errors */}
                {error && <p className="text-red-800 mt-8 text-center">{error}</p>}

                {/* Sign up Form */}
                <form onSubmit={handleSubmit(create)}>
                    <div className="space-y-5">

                        {/* Name */}
                        <Input
                            label="Name: "
                            placeholder="Enter your name"
                            type="text"
                            {...register("name", { required: "Name is required" })}
                        />
                        {errors.name && (<p className="text-red-500">{errors.name.message}</p>)}

                        {/* Email */}
                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: "Email is required",
                                validate: {
                                    matchPatern: (value) =>
                                        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i.test(value) ||
                                        "Invalid email format",
                                },
                            })}
                        />
                        {errors.email && (<p className="text-red-500">{errors.email.message}</p>)}

                        {/* Password */}
                        <Input
                            label="Password"
                            placeholder="Enter your password"
                            type="password"
                            {...register("password", {
                                required: "Password is required"
                            })}
                        />
                        {errors.password && (<p className="text-red-500">{errors.password.message}</p>)}

                        <Button
                            type='submit'
                            className='w-full'
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Creating Account..." : "Create Account"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
