import React from 'react'
import { useLoaderData, useNavigation } from 'react-router';
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import SmallSpinner from '../../../components/Spinner/SmallSpinner';
import Checkout from './Checkout';
import useTitle from '../../../hooks/useTitle';


const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);
console.log(stripePromise)

const Payment = () => {
    useTitle("Payment")
    const order = useLoaderData();

    console.log(order)
    const navigation = useNavigation();
    const { _id, bookImg, bookName, price } = order
    if (navigation.state === 'loading') {
        return <SmallSpinner></SmallSpinner>
    }
    return (
        <div>
            <h1 className="text-3xl">Payment for {bookName}</h1>
            <p className="text-xl">Please pay {price} for your product</p>
            <div className='w-96 my-12'>
                <Elements stripe={stripePromise}>
                    <Checkout order={order} />
                </Elements>
            </div>
        </div>
    )
}

export default Payment