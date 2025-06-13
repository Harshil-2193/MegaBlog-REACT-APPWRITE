import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as storeLogin } from '../store/authSlice'
import {Button, Input, Logo} from "./index"
import {useDispatch} from "react-redux"
import authService from '../appwrite/auth'
import {useForm} from "react-hook-form"


const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {register, handleSubmit, formState: { errors, isSubmitting }} = useForm();
    const [error, setError] = useState("");

    const login = async (data)=>{
        setError("");
        try {
            const session = await authService.login(data);
            if(session){
                const userData = await authService.getCurrentUser();
                if(userData) dispatch(storeLogin(userData));
                navigate('/'); 
            }
        } catch (error) {
            setError(error?.message || "Something went wrong");
            
        }
    }
  return (
    <div className='flex items-center justify-center w-full'>
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <div className='mb-2 flex justify-center'>
                <span className='w-full inline-block max-w-[100px]'>
                    <Logo width='100px'/>
                </span>
            </div>
            <h2 className='text-center text-2xl font-bold leading-light'>Sign in to your account</h2>
            <p className='mt-2 text-center text-base text-black/60'>
                Don&apos;t have any account?&nbsp;
                <Link 
                to={`/signup`} 
                className='font-medium text-primary transition-all duration-200 hover:underline'
                >
                    Sign Up
                </Link>
            </p>

            {/* Display Errors */}
            {error && <p className='text-red-800 mt-8 text-center'>{error}</p>}

            {/* Login Form */}
            <form onSubmit={handleSubmit(login)} className='mt-8'>
                <div className='space-y-5'>
                    
                    {/* Email */}
                    <Input 
                    label="Email: "
                    placeholder="Enter your email"
                    type="email"
                    {...register("email",{
                        required:"Email is required",
                        validate:{
                            matchPatern: (value)=>/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i.test(value) || "Invalid email format"
                        }
                    })} 
                    />
                     {errors.email && (<p className="text-red-500">{errors.email.message}</p>)}

                    {/* Password */}
                    <Input 
                    label="Password"
                    placeholder="Enter your password"
                    type="password"
                    {...register("password", {
                        required:"Password is required"
                    })}
                    />
                     {errors.password && (<p className="text-red-500">{errors.password.message}</p>)}

                    <Button
                    type='submit'
                    className='w-full'
                    disabled={isSubmitting}
                    >
                        {isSubmitting ? "Signing in..." : "Sign In"}
                    </Button>
                </div>

            </form>
        </div> 
    </div>
  )
}

export default Login
