import React, { useContext, useState } from 'react'
import { useForm, } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify';
import PrimaryButton from '../../components/Button/PrimaryButton';
import SmallSpinner from '../../components/Spinner/SmallSpinner';
import { AuthContext } from '../../context/AuthProvider';
import { FaGoogle } from "react-icons/fa";
import { setAuthToken } from '../../TokenApi/Auth';
import useTitle from '../../hooks/useTitle';

const Signup = () => {
  useTitle('SignUp')
  const { createUser, updateUserProfile, verifyEmail, loading, setLoading, signInWithGoogle } = useContext(AuthContext)
  //ekhane react-hook-form install kore oi hook ti use kora holo
  const { register, formState: { errors }, handleSubmit } = useForm();
  const [signUpError, setSignUPError] = useState('')

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state ?.from ?.pathname || '/';


  const handleSignUp = (data) => {
    const { name, email, image, role, password } = data
    console.log(name, email, role)
    //start for hosting for image
    const formData = new FormData()
    formData.append('image', image[0])
    console.log(formData)

    const uri = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_imgbb_key}`
    fetch(uri, {
      method: 'POST',
      body: formData
    }).then(res => res.json())
      .then(data => {
        console.log(data)
        createUser(email, password)
          .then(result => {
            console.log(result)
            const userInfo = result ?.user;
            const user = {
              name: name,
              email: email,
              role: role
            }
            setAuthToken(user)
            updateUserProfile(name, data.data.url)
              .then(res => {
                toast.success('Registration Successful.....!')
              })
              .catch(err => { console.log(err) })

          })
          .catch(err => { console.log(err) })
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
        setSignUPError(err.message)
      })
    //end for hosting image
  }


  //sign google
  const handleGoogleSignIn = () => {
    signInWithGoogle().then(result => {
      const userInfo = result.user;
      const user = {
        name: userInfo.displayName,
        email: userInfo.email,
        role: 'buyer'
      }
      console.log(user)

      if (result.user) {
        setAuthToken(user)
        toast.success('Registration Successful.....!')
      }
    })
      .catch(err => {
        setLoading(false)
        console.log(err)
      })
  }


  return (
    <div className='flex justify-center items-center pt-8'>
      <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
        <div className='mb-8 text-center'>
          <h1 className='my-3 text-4xl font-bold'>Signup</h1>
          <p className='text-sm text-gray-400'>Create a new account</p>
        </div>
        <form
          onSubmit={handleSubmit(handleSignUp)}
          noValidate=''
          action=''
          className='space-y-12 ng-untouched ng-pristine ng-valid'
        >
          <div className='space-y-4'>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>
                Name
              </label>
              <input
                type='text'
                name='name'
                id='name'
                {...register('name', { required: "Your name at least 6 charcter or longer", minLength: { value: 6, message: 'Your name at least 6 charactars or longer' } })}
                placeholder='Enter Your Name Here'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-green-500 bg-gray-200 text-gray-900'
                data-temp-mail-org='0'
              />
              {errors.name && <p className="text-red-400">{errors.name ?.message}</p>}

            </div>
            <div>
              <label htmlFor='image' className='block mb-2 text-sm'>
                Select Image:
              </label>
              <input
                type='file'
                id='image'
                name='image'
                accept='image/*'
                {...register('image', { required: "Your photo requird" })} />
              {errors.image && <p className="text-red-400">{errors.image ?.message}</p>}
            </div>
            <div>
              <label className="label"><span className="label-text">Role</span>
              </label>
              <select
                {...register('role')}
                className="select input-bordered w-full max-w-xs">
                <option disabled value="buyer" selected>what do you want to do</option>
                <option value="seller">seller</option>
                <option value="buyer">buyer</option>
              </select>
            </div>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>
                Email address
              </label>
              <input
                {...register("email", { required: "Email is required" })}
                type='email'
                name='email'
                id='email'
                placeholder='Enter Your Email Here'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-green-500 bg-gray-200 text-gray-900'
                data-temp-mail-org='0'
              />
              {errors.email && <p className="text-red-400">{errors.email ?.message}</p>}

            </div>
            <div>
              <div className='flex justify-between mb-2'>
                <label htmlFor='password' className='text-sm'>
                  Password
                </label>
              </div>
              <input
                type='password'
                name='password'
                id='password'
                {...register('password', { required: "password is requied", minLength: { value: 6, message: 'password at least 6 charactars or longer' } })}

                placeholder='*******'
                className='w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-200 focus:outline-green-500 text-gray-900'
              />
              {errors.password && <p className="text-red-400">{errors.password ?.message}</p>}

            </div>
          </div>
          <div className='space-y-2'>
            <div>
              <PrimaryButton
                type='submit'
                classes='w-full px-8 py-3 font-semibold rounded-md bg-gray-900 hover:bg-gray-700 hover:text-white text-gray-100'
              >
                {loading ? <SmallSpinner></SmallSpinner> : "Sign Up"}
              </PrimaryButton>
            </div>
          </div>
          {signUpError && <p className='text-red-600'>{signUpError}</p>}

        </form>
        <div className='flex items-center pt-4 space-x-1'>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
          <p className='px-3 text-sm dark:text-gray-400'>
            Signup with social accounts
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
          Already have an account yet?{' '}
          <Link to='/login' className='hover:underline text-gray-600'>
            Sign In
          </Link>
          .
        </p>
      </div>
    </div>
  )
}

export default Signup
