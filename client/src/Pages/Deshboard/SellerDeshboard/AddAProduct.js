import React, { useContext } from 'react'
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import PrimaryButton from '../../../components/Button/PrimaryButton';
import SmallSpinner from '../../../components/Spinner/SmallSpinner';
import { AuthContext } from '../../../context/AuthProvider';
import useTitle from '../../../hooks/useTitle';


const AddAProduct = () => {
    useTitle("Add A Product")
    const {user} = useContext(AuthContext)
    const { register, formState: { errors }, handleSubmit } = useForm();
    const navigate = useNavigate()


    const { data: bookCategory = [''], isloading } = useQuery({
        queryKey: ['bookCategory'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/bookCategory ')
            const data = await res.json()
            console.log(data)
            return data
        }
    })
 
    const handleAddProduct = (data) => {
        console.log(data)
        const formData = new FormData();
        formData.append('image', data.image[0])
        const uri = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_imgbb_key}`
        fetch(uri, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    console.log(imgData.data.url)
                    var date = new Date().toString('YYYY-MM-dd')
                    const product = {
                        originalPrice : data.Orginalprice,
                        YearOfuse : data.YearOfuse,
                        categoryId : data.categoryId,
                        description : data.description,
                        img : imgData.data.url,
                        location : data.location,
                        bookName : data.productName,
                        quality : data.quality,
                        resalePrice : data.resalePrice,
                        sellerName :  user.displayName,
                        date : date,
                        email : user.email,
                        status : "Unsold",
                        advertise : false,
                        verify : false
                    }
                    //save product info to database
                    fetch(`http://localhost:5000/product`, {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `Bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(product)

                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data)
                            toast.success('added success fully')
                            navigate('/deshboard/MyProduct')
                        })

                }
            })
            .catch(err => { console.log(err) })
    }
    if (isloading) {
        return <progress className="progress w-56"></progress>
    }

    return (
        <div className='flex justify-center items-center pt-8 mx-autogit add .
 le fi'>
            <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
                <div className='mb-8 text-center'>
                    <h1 className='my-3 text-4xl font-bold'>Signup</h1>
                    <p className='text-sm text-gray-400'>Create a new account</p>
                </div>
                <form
                    onSubmit={handleSubmit(handleAddProduct)}
                    noValidate=''
                    action=''
                    className='space-y-12 ng-untouched ng-pristine ng-valid'
                >
                    <div className='space-y-4'>
                        <div>
                            <label htmlFor='productName' className='block mb-2 text-sm'>
                               Product Name
                </label>
                            <input
                                type='text'
                                name='productName'
                                id='productName'
                                {...register('productName', { required: "Your name at least 6 charcter or longer", minLength: { value: 6, message: 'Your name at least 6 charactars or longer' } })}
                                placeholder='Enter Your Product Here'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-green-500 bg-gray-200 text-gray-900'
                                data-temp-mail-org='0'
                            />
                            {errors.productName && <p className="text-red-400">{errors.productName ?.message}</p>}

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
                            <label className="label"><span className="label-text">Quality</span>
                            </label>
                            <select
                                {...register('quality')}
                                className="select input-bordered w-full max-w-xs">
                                <option disabled value="excellent" selected>what do you want to do</option>
                                <option value="excellent">Excellent</option>
                                <option value="good">Good</option>
                                <option value="fair">Fair</option>
                            </select>
                        </div>
                       
                        <div>
                            <label htmlFor='location' className='block mb-2 text-sm'>
                                Location
                </label>
                            <input
                                {...register("location", { required: "Location is required" })}
                                type='text'
                                name='location'
                                id='location'
                                placeholder='Enter Your Location Here'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-green-500 bg-gray-200 text-gray-900'
                                data-temp-mail-org='0' />


                        </div>
                        <div>
                            <div className='flex justify-between mb-2'>
                                <label htmlFor='Orginalprice' className='text-sm'>
                                    Original price
                  </label>
                            </div>
                            <input
                                type='number'
                                name='Orginalprice'
                                id='Orginalprice'
                                {...register('Orginalprice', { required: "price is requied", })}


                                className='w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-200 focus:outline-green-500 text-gray-900'
                            />


                        </div>
                        <div>
                            <div className='flex justify-between mb-2'>
                                <label htmlFor='resalePrice' className='text-sm'>
                                    Resale Price
              </label>
                            </div>
                            <input
                                type='number'
                                name='resalePrice'
                                id='resalePrice'
                                {...register('resalePrice', { required: "price is requied" })}


                                className='w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-200 focus:outline-green-500 text-gray-900'
                            />


                        </div>
                        <div>
                            <label className="label"><span className="label-text">Category Name</span>
                            </label>
                            <select
                                {...register('categoryId')}
                                className="select input-bordered w-full max-w-xs">
                                <option disabled selected>Pick a Speciality</option>
                                {
                                    bookCategory.map(speciality => <option key={speciality._id} value={speciality._id}>{speciality.name}</option>)
                                }
                            </select>
                        </div>
                        <div>
                            <div className='flex justify-between mb-2'>
                                <label htmlFor='YearOfUse' className='text-sm'>
                                    Year Of use
                  </label>
                            </div>
                            <input
                                type='number'
                                name='YearOfUse'
                                id='YearOfUse'
                                {...register('YearOfuse', { required: "year number is requied", })}

                                className='w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-200 focus:outline-green-500 text-gray-900'
                            />
                        </div>
                        <div>
                            <label htmlFor='description' className='block mb-2 text-sm'>
                                Description
                </label>
                            <input
                                type='text'
                                name='description'
                                id='description'
                                {...register('description', { required: "Your description at least 6 charcter or longer", minLength: { value: 6, message: 'Your description at least 6 charactars or longer' } })}
                                placeholder='Enter Your description Here'
                                className='w-full px-3 py-8 border rounded-md border-gray-300 focus:outline-green-500 bg-gray-200 text-gray-900'
                                data-temp-mail-org='0'
                            />
                            {errors.description && <p className="text-red-400">{errors.description ?.message}</p>}

                        </div>
                    </div>
                    <div className='space-y-2'>
                        <div>
                            <PrimaryButton
                                type='submit'
                                classes='w-full px-8 py-3 font-semibold rounded-md bg-gray-900 hover:bg-gray-700 hover:text-white text-gray-100'
                            >
                                {isloading ? <SmallSpinner></SmallSpinner> : "Sign Up"}
                            </PrimaryButton>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddAProduct
