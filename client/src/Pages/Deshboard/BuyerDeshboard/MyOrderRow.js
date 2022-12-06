import React from 'react'
import { Link } from 'react-router-dom';

const MyOrderRow = ({ order }) => {
    const { _id, bookImg, bookName, price, paid } = order

    return (
        <tr>
            <td>
                <div className="flex items-center space-x-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            <img src={bookImg} alt="Avatar Tailwind CSS Component" />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{bookName}</div>
                    </div>
                </div>
            </td>
            <td>
                {price}
            </td>
            <th>
                {
                    price && !paid && <Link to={`/deshboard/payment/${_id}`}><button className="btn btn-pricmary">Pay</button></Link>
                }
                {
                    price && paid && <span className="text-primary">Paid</span>
                }


            </th>
        </tr>
    )
}

export default MyOrderRow
