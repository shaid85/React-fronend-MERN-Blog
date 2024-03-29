import React, { useState } from 'react'
import {useForm} from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Input from './Input';
import Button from './Button';
import axios from 'axios';
import toast from 'react-hot-toast';
import {useDispatch} from 'react-redux'
import {login,logout} from '../store/authSlice';

function Login() {
  const [error, setError] = useState('')
  const [isshow, setIsshow] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {register,handleSubmit} = useForm()

  const loginSubmit = async (data) => {
    setError("")
      try {
        setLoading(true);
        const session = await axios.post("/api/v1/users/login/", data)
        if(session){
          const response = await axios.get("/api/v1/users/currentuser/")
          if(response){
            const userData = response.data.data
            if(userData){
              dispatch(login({userData}))
            }else{
              dispatch(logout())
            }
            toast.success('Login successful')
            navigate("/profile")
          }
        }
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false);
      }
  }
  
  const handleClick = (e) => {
    e.preventDefault()
    setIsshow((prev) => !prev)
}

  return (
    <div
    className='flex items-center justify-center w-full text-black'
    >
      <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>

        <h2 className="text-center text-2xl font-bold leading-tight">{loading ? 'loading...' : 'Sign in to your account'}</h2>
        <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
        </p>
          {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
          <form onSubmit={handleSubmit(loginSubmit)} className='mt-8'>
            <Input label="Email: " 
              type="email"
              placeholder="Type your email..."
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                }
              })}
            />
<div className="w-full flex relative">
            <Input label="Password: " 
              type={isshow ? "text" : "password"}
              placeholder="Enter your password..."
              {...register("password", {
                required: true
              })}
            />
            <a type='button'
            onClick={handleClick}
            className="absolute top-9 right-3 z-10 cursor-pointer text-blue-400">{isshow ?  
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
  <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
  <path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
</svg>

 : 
 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
  <path fillRule="evenodd" d="M3.28 2.22a.75.75 0 00-1.06 1.06l14.5 14.5a.75.75 0 101.06-1.06l-1.745-1.745a10.029 10.029 0 003.3-4.38 1.651 1.651 0 000-1.185A10.004 10.004 0 009.999 3a9.956 9.956 0 00-4.744 1.194L3.28 2.22zM7.752 6.69l1.092 1.092a2.5 2.5 0 013.374 3.373l1.091 1.092a4 4 0 00-5.557-5.557z" clipRule="evenodd" />
  <path d="M10.748 13.93l2.523 2.523a9.987 9.987 0 01-3.27.547c-4.258 0-7.894-2.66-9.337-6.41a1.651 1.651 0 010-1.186A10.007 10.007 0 012.839 6.02L6.07 9.252a4 4 0 004.678 4.678z" />
</svg>

}</a>
</div>
            <Button type='submit' >Login</Button>
          </form>
      </div>
    </div>
  )
}

export default Login
