import React, { useState, useContext } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'

import { useForm, } from 'react-hook-form';
import { toast } from 'react-toastify';
import PrimaryButton from '../../components/Button/PrimaryButton';
import SmallSpinner from '../../components/Spinner/SmallSpinner';
import { AuthContext } from '../../context/AuthProvider';
import { FaGoogle } from "react-icons/fa";
import { setAuthToken } from '../../TokenApi/Auth';
import useTitle from '../../hooks/useTitle';


const Login = () => {
  useTitle('Login')
  const [userEmail, setUserEmail] = useState('');
  const { register, formState: { errors }, handleSubmit } = useForm();
  const [loginError, setLoginError] = useState('');
  const { signin, signInWithGoogle, loading, setLoading, resetPassword } = useContext(AuthContext);
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state ?.from ?.pathname || '/';


  const handleLogin = (data) => {
    const { email, password } = data;
    setUserEmail(email)
    setLoginError('');
    signin(email, password)
      .then(result => {
        console.log("this from login ", result.user)
        toast.success('Login Successful.....!')
        // save token
        setAuthToken(result.user)
        navigate(from, { replace: true })
      })
      .catch(error => {
        setLoading(false)
        console.log(error.message)
        setLoginError(error.message);
      });
  }

  const handleGoogleSignIn = () => {
    console.log('click')
    signInWithGoogle().then(result => {
      const userInfo = result.user;
      const user = {
        name: userInfo.displayName,
        email: userInfo.email,
        role: 'buyer'
      }
      console.log(user)
      toast.success('Login Successful.....!')
      // save token
      setAuthToken(user)
      navigate(from, { replace: true })
    })
      .catch(err => {
        setLoading(false)
        console.log(err)
      })
  }
  const handleResetPassword = () => {
    resetPassword(userEmail).then(() => {
      toast.success('please check your email for reset link')
    })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }


  return (
    <div className='flex justify-center items-center pt-8'>
      <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-200 text-gray-900'>
        <div className='mb-8 text-center'>
          <h1 className='my-3 text-4xl font-bold'>Sign in</h1>
          <p className='text-sm text-gray-400'>
            Sign in to access your account
          </p>
        </div>
        <form
          onSubmit={handleSubmit(handleLogin)}
          noValidate=''
          action=''
          className='space-y-6 ng-untouched ng-pristine ng-valid'
        >
          <div className='space-y-4'>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>
                Email address
              </label>
              <input
                onBlur={event => setUserEmail(event.target.value)}
                type='email'
                name='email'
                {...register("email", { required: "Email is required" })}
                id='email'
                placeholder='Enter Your Email Here'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-green-500 bg-gray-200 text-gray-900'
                data-temp-mail-org='0'
              />
              {errors.email && <p className="text-red-400">{errors.email ?.message}</p>}

            </div>
            <div>
              <div className='flex justify-between'>
                <label htmlFor='password' className='text-sm mb-2'>
                  Password
                </label>
              </div>
              <input
                type='password'
                name='password'
                id='password'
                {...register('password', { required: "password is requied", minLength: { value: 6, message: 'password at least 6 charactars or longer' } })}
                placeholder='*******'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-green-500 bg-gray-200 text-gray-900'
              />
              {errors.password && <p className="text-red-400">{errors.password ?.message}</p>}

            </div>
          </div>

          <div>
            <PrimaryButton
              type='submit'
              classes='w-full px-8 py-3 font-semibold rounded-md bg-gray-900 hover:bg-gray-700 hover:text-white text-gray-100'
            >
              {loading ? <SmallSpinner></SmallSpinner> : "Sign In"}
            </PrimaryButton>
          </div>
          {loginError && <p className='text-red-600'>{loginError}</p>}

        </form>
        <div className='space-y-1'>
          <button onClick={handleResetPassword} className='text-xs hover:underline text-gray-400'>
            Forgot password?
          </button>
        </div>
        <div className='flex items-center pt-4 space-x-1'>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
          <p className='px-3 text-sm dark:text-gray-400'>
            Login with social accounts
          </p>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
        </div>
        <div className='flex justify-center space-x-4'>
          <button
            onClick={handleGoogleSignIn}
            className='hover:text-gray-100 bg-gradient-to-r from-emerald-500 to-lime-500 text-white w-full px-8 flex items-center justify-center py-3 font-semibold rounded-md bg-gray-900 hover:bg-gray-700 hover:text-white text-gray-100'
          >
            <FaGoogle className="h-6 w-6 text-center"></FaGoogle>
            <p className="px-3">Sign with google</p>
          </button>
        </div>
        <p className='px-6 text-sm text-center text-gray-400'>
          Don't have an account yet?{' '}
          <Link to='/signup' className='hover:underline text-gray-600'>
            Sign up
          </Link>
          .
        </p>
      </div>
    </div>
  )
}

export default Login
