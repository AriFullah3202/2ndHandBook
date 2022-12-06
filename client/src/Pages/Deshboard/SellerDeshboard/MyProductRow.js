import React from 'react'

const MyProductRow = ({ product, handleDelete, handleAdvertise }) => {
    const { _id, img, bookName, resalePrice, status, advertise } = product

    return (
        <tr>
            <td>
                <div className="flex items-center space-x-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            <img src={img} alt="Avatar Tailwind CSS Component" />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{bookName}</div>
                        <div className="text-sm opacity-50">{resalePrice}</div>
                    </div>
                </div>
            </td>
            <td>
                {status}
            </td>
            <th>
                <button onClick={() => { handleDelete(_id) }} className="btn btn-red btn-xs">Delete</button>
                <button onClick={() => { handleAdvertise(_id) }} className="btn btn-primary btn-xs">{advertise ? "Advertised" : "Advertise"}</button>
            </th>
        </tr>
    )
}

export default MyProductRow
