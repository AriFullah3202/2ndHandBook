import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import SmallSpinner from '../../../components/Spinner/SmallSpinner';


const AllBuyer = () => {
    const { data: buyer = [''], isloading, refetch } = useQuery({
        queryKey: ['buyer'],
        queryFn: async () => {
            try {
                const res = await fetch(`http://localhost:5000/buyer`, {
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
    const handleDelete = (buyer) => {
        fetch(`http://localhost:5000/buyer/${buyer}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(res => res.json())
            .then(data => {
                toast.success('delete success fully')
                refetch()
            })
    }
    if (isloading) {
        <SmallSpinner></SmallSpinner>
    }
    return (
        <div className="overflow-x-auto">
            <table className="table table-compact w-full">
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Email Address</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>


                    {
                        buyer.map((buyer, index) => <tr key={index}>
                            <th>{index + 1}</th>
                            <td>{buyer.name}</td>
                            <td>{buyer.email}</td>
                            <td><button onClick={() => { handleDelete(buyer._id) }} className="btn btn-red btn-xs">Delete</button></td>
                        </tr>)
                    }

                </tbody>
                <tfoot>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Email Address</th>
                        <th>Action</th>

                    </tr>
                </tfoot>
            </table>
        </div>
    )
}

export default AllBuyer
