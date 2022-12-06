import React, { useContext } from 'react'
import { AuthContext } from '../../../context/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import MyOrderRow from './MyOrderRow';
import useTitle from '../../../hooks/useTitle';

const MyOrder = () => {
    useTitle("My Order")
    const { user } = useContext(AuthContext)
    const email = user ?.email;
    const { data: myOrder = [''], isloading, refetch } = useQuery({
        queryKey: ['myOrder'],
        queryFn: async () => {
            try {
                const res = await fetch(`http://localhost:5000/myOrder?email=${email}`, {
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
    const handlePay = (id) => {
        console.log(id)
    }
    return (
        <div className="overflow-x-auto w-full">
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Action</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        myOrder.map(order => <MyOrderRow order={order}></MyOrderRow>)
                    }
                </tbody>
            </table>
        </div>
    )
}

export default MyOrder
