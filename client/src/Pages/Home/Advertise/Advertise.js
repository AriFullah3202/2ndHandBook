import React, { useEffect, useState } from 'react'
import { useNavigation } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';
import SmallSpinner from '../../../components/Spinner/SmallSpinner';
import CategoryProduct from '../../CategoryProduct/CategoryProduct';
import BookingModel from '../../Category/BookingModel';

const Advertise = () => {
    const navigation = useNavigation();
    const [product, setProduct] = useState(null)
    const [email, setEmail] = useState([''])

    const { data: advertise = [''], isloading, } = useQuery({
        queryKey: ['advertise'],
        queryFn: async () => {
            try {
                const res = await fetch(`http://localhost:5000/advertise`, {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                })
                const data = await res.json();
                console.log(data)
                return data
            }
            catch (error) {
                console.log(error)
            }
        }
    })
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
            {
                advertise && advertise.length > 0 ? <>
                    <h1 className="text-3xl text-green-400 mx-auto">Advertised by seller</h1>
                    <div className="mx-auto">
                        {



                            advertise.map(product => <CategoryProduct product={product} setProduct={setProduct} emaill={email} handleReport={handleReport}></CategoryProduct>)
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
                </> : <div className="hidden">Advertise</div>
            }
        </>
    )
}

export default Advertise
