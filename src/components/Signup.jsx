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
        if (userData) {
          dispatch(storeLogin(userData));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-[#0f0c29] via-[#302b63] to-[#24243e] px-4 rounded-xl">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-10 border border-white/20">
        <div className="mb-6 flex justify-center">
          <span className="w-full inline-block max-w-[100px]">
            <Logo width="100px" />
          </span>
        </div>

        <h2 className="text-center text-3xl font-extrabold text-white drop-shadow">
          Create your account
        </h2>
        <p className="mt-3 text-center text-sm text-gray-300">
          Already have an account?{" "}
          <Link
            to={`/login`}
            className="font-semibold text-indigo-400 hover:text-indigo-300 transition"
          >
            Sign in
          </Link>
        </p>

        {error && (
          <p className="text-red-400 mt-6 text-center text-sm">{error}</p>
        )}

        <form onSubmit={handleSubmit(create)} className="mt-6 space-y-5">
          <Input
            label="Name"
            placeholder="Enter your name"
            type="text"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <p className="text-red-400 text-sm">{errors.name.message}</p>
          )}

          <Input
            label="Email"
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
          {errors.email && (
            <p className="text-red-400 text-sm">{errors.email.message}</p>
          )}

          <Input
            label="Password"
            placeholder="Enter your password"
            type="password"
            {...register("password", {
              required: "Password is required",
            })}
          />
          {errors.password && (
            <p className="text-red-400 text-sm">{errors.password.message}</p>
          )}

          <Button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition text-white font-semibold rounded-lg shadow-xl"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
