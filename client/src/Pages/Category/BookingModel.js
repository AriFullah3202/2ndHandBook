import React, { useState, useContext } from 'react'
import { useForm } from 'react-hook-form';
import PrimaryButton from '../../components/Button/PrimaryButton';
import SmallSpinner from '../../components/Spinner/SmallSpinner';
import { AuthContext } from '../../context/AuthProvider';
import { toast } from 'react-toastify';

const BookingModel = ({ product, setProduct }) => {
    const { user } = useContext(AuthContext)
    console.log(user)
    const { bookName, resalePrice, img, _id } = product;
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [loading, setLoading] = useState(false)
    const handleOrder = (data) => {
        setLoading(true)
        const bookOrder = {
            name: user.displayName,
            email: user.email,
            bookName: bookName,
            bookId: _id,
            bookImg: img,
            price: resalePrice,
            location: data ?.location,
            phone: data ?.phone

        }


        fetch('http://localhost:5000/bookOrder', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(bookOrder)

        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    // setTreatment mane model k off kore dicchi
                    setLoading(false)
                    setProduct(null)
                    toast.success("order confirmed")


                }
                else {
                    setLoading(false)
                    setProduct(null)
                    toast.error(data.message)
                }
            })
            .catch(err => console.log(err))
    }
    return (
        <div>
            <input type="checkbox" id="Booking-model" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="Booking-model" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <form
                        onSubmit={handleSubmit(handleOrder)}
                        noValidate=''
                        action=''
                        className='space-y-6 ng-untouched ng-pristine ng-valid'
                    >
                        <div className='space-y-4'>

                            <div>
                                <label htmlFor='name' className='block mb-2 text-sm'>
                                    Name
              </label>
                                <input
                                    disabled
                                    defaultValue={user ?.displayName}
                                    type='name'
                                    name='namel'
                                    {...register("name")}
                                    id='name'
                                    className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-green-500 bg-gray-200 text-gray-900'
                                    data-temp-mail-org='0'
                                />
                            </div>


                            <div>
                                <label htmlFor='email' className='block mb-2 text-sm'>
                                    Email address
              </label>
                                <input
                                    disabled
                                    defaultValue={user ?.email}
                                    type='email'
                                    name='email'
                                    {...register("email")}
                                    id='email'
                                    className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-green-500 bg-gray-200 text-gray-900'
                                    data-temp-mail-org='0'
                                />


                            </div>
                            <div>
                                <label htmlFor='bookName' className='block mb-2 text-sm'>
                                    Book Name
              </label>
                                <input
                                    disabled
                                    defaultValue={bookName}
                                    type='text'
                                    name='bookName'
                                    {...register("bookName")}
                                    id='bookName'
                                    className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-green-500 bg-gray-200 text-gray-900'
                                    data-temp-mail-org='0'
                                />


                            </div>
                            <div>
                                <label htmlFor='price' className='block mb-2 text-sm'>
                                    Price
              </label>
                                <input
                                    disabled
                                    defaultValue={resalePrice}
                                    type='number'
                                    name='price'
                                    {...register("price")}
                                    id='price'
                                    className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-green-500 bg-gray-200 text-gray-900'
                                    data-temp-mail-org='0'
                                />


                            </div>
                            <div>

                                <label htmlFor='phone' className='text-sm mb-2'>
                                    Phone Number
                </label>

                                <input
                                    type='number'
                                    name='phone'
                                    id='phone'
                                    {...register('phone', { required: "phone is requied", minLength: { value: 11, message: 'phone Number at least 11 charactars or longer' } })}
                                    className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-green-500 bg-gray-200 text-gray-900'
                                />
                                {errors.phone && <p className="text-red-400">{errors.phone ?.message}</p>}
                            </div>
                            <div>

                                <label htmlFor='location' className='text-sm mb-2'>
                                    Your Location
</label>
                                <input
                                    type='text'
                                    name='location'
                                    id='location'
                                    {...register('location', { required: "Location is requied", minLength: { value: 4, message: 'phone Number at least 4 charactars or longer' } })}
                                    className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-green-500 bg-gray-200 text-gray-900'
                                />
                                {errors.location && <p className="text-red-400">{errors.location ?.message}</p>}
                            </div>

                        </div>



                        <div>
                            <PrimaryButton
                                type='submit'
                                classes='w-full px-8 py-3 font-semibold rounded-md bg-gray-900 hover:bg-gray-700 hover:text-white text-gray-100'
                            >
                                {loading ? <SmallSpinner></SmallSpinner> : "Submit"}
                            </PrimaryButton>
                        </div>

                    </form>
                </div>

            </div>
        </div >
    )
}

export default BookingModel
