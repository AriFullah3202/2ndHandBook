import React, { useContext } from 'react';
import { AuthContext } from '../../../context/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import MyProductRow from './MyProductRow';
import SmallSpinner from '../../../components/Spinner/SmallSpinner';
import useTitle from '../../../hooks/useTitle';

const MyProduct = () => {
    useTitle("My Product")

    const { user } = useContext(AuthContext)
    const email = user ?.email;

    const { data: product = [''], isloading, refetch } = useQuery({
        queryKey: ['product', email],
        queryFn: async () => {
            try {
                const res = await fetch(`http://localhost:5000/product?email=${email}`, {
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
    const handleDelete = (product) => {
        fetch(`http://localhost:5000/product/${product}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(res => res.json())
            .then(data => {
                refetch()
            })
    }
    if (isloading) {
        return <SmallSpinner></SmallSpinner>
    }
    //for doing advertise
    const handleAdvertise = (id) => {
        fetch(`http://localhost:5000/product/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'Application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`

            },
            body: JSON.stringify({ advertise: true })
        })
            .then(res => res.json())
            .then(data => {
                refetch()
            })
            .catch(err => { console.log(err) })


    }

    return (
        <div className="overflow-x-auto w-full">
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Status</th>
                        <th>Action</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        product.map(product => <MyProductRow product={product} handleDelete={handleDelete} handleAdvertise={handleAdvertise}></MyProductRow>)
                    }
                </tbody>
            </table>
        </div>
    )
}

export default MyProduct
