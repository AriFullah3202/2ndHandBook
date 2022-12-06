import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import SmallSpinner from '../../../components/Spinner/SmallSpinner';

const AllSeller = () => {
    const { data: seller = [''], isloading, refetch } = useQuery({
        queryKey: ['seller'],
        queryFn: async () => {
            try {
                const res = await fetch(`http://localhost:5000/seller`, {
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
    const handleDelete = (seller) => {
        fetch(`http://localhost:5000/seller/${seller}`, {
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


    const handleVerify = (id) => {
        fetch(`http://localhost:5000/seller/verify/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ verify: true })
        })
            .then(res => res.json())
            .then(data => {
                refetch()
            })
            .catch(err => console.log(err))
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
                        <th>Verify</th>
                    </tr>
                </thead>
                <tbody>


                    {
                        seller.map((seller, index) => <tr key={seller._id}>
                            <th>{index + 1}</th>
                            <td>{seller.name}</td>
                            <td>{seller.email}</td>
                            <td><button onClick={() => { handleDelete(seller._id) }} className="btn btn-red btn-xs">Delete</button></td>
                            <td><button onClick={() => { handleVerify(seller._id) }} className="btn btn-red btn-xs">{seller.verify ? "Verified" : "Verify"}</button></td>

                        </tr>)
                    }





                    {/* <tr>
                        <th>1</th>
                        <td>Cy Ganderton</td>
                        <td>Quality Control Specialist</td>
                        <td>Littel, Schaden and Vandervort</td>
                        <td>Canada</td>

                    </tr> */}

                </tbody>
                <tfoot>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Email Address</th>
                        <th>Action</th>
                        <th>Verify</th>

                    </tr>
                </tfoot>
            </table>
        </div>
    )
}

export default AllSeller
