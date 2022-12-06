import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';


const Report = () => {
    const { data: allReportedItems = [''], isloading, refetch } = useQuery({
        queryKey: ['allReportedItems'],
        queryFn: async () => {
            try {
                const res = await fetch(`http://localhost:5000/allReportedItems`, {
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

    const handleDelete = (id) => {
        fetch(`http://localhost:5000/deleteReport/${id}`, {
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
    return (
        <div className="overflow-x-auto">
            <table className="table table-compact w-full">
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Seller Email Address</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>


                    {
                        allReportedItems.map((item, index) => <tr key={item._id}>
                            <th>{index + 1}</th>
                            <td>{item.bookName}</td>
                            <td>{item.email}</td>
                            <td><button onClick={() => { handleDelete(item._id) }} className="btn btn-red btn-xs">Delete</button></td>

                        </tr>)
                    }

                </tbody>
                <tfoot>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Seller Email Address</th>
                        <th>Action</th>

                    </tr>
                </tfoot>
            </table>
        </div>
    )
}

export default Report
