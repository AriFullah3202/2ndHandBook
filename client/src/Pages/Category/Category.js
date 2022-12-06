import React, { useState, useEffect } from 'react'
import { useLoaderData, useNavigation } from 'react-router';
import CategoryProduct from '../CategoryProduct/CategoryProduct';
import BookingModel from './BookingModel';
import axios from "axios";
import { toast } from 'react-toastify';
import SmallSpinner from '../../components/Spinner/SmallSpinner';
import useTitle from '../../hooks/useTitle';



const Category = () => {
    useTitle('Category')
    const data = useLoaderData();
    const navigation = useNavigation();
    const [product, setProduct] = useState(null)
    const [email, setEmail] = useState([''])
    console.log(data)
    useEffect(() => {
        axios.get('http://localhost:5000/sellerStatus')
            .then(data => {
                console.log(data.data)
                data.data.map(em => setEmail(em.email))
            })
            .catch(error => console.log(error));
    }, [])

    const handleReport = (product) => {

        console.log(product)
        axios.put(`http://localhost:5000/report/${product._id}`, {
            report: true
        })
            .then(data => {
                console.log(data)
                toast.success('reported to admin succesfully')
            })
            .catch(err => console.log(err))

    }

    if (navigation.state === 'loading') {
        <SmallSpinner></SmallSpinner>
    }
    return (
        <>
            <div className="mx-auto">
                {



                    data.map(product => <CategoryProduct key={product._id} product={product} setProduct={setProduct} emaill={email} handleReport={handleReport}></CategoryProduct>)
                }
                {

                }

            </div>
            {
                product &&
                <BookingModel
                    product={product}
                    setProduct={setProduct}

                ></BookingModel>
            }
        </>
    )
}

export default Category
