import React from 'react'
import { FaCheck } from "react-icons/fa";


const CategoryProduct = ({ product, setProduct, emaill, handleReport }) => {
    const { _id, bookName, img, date, originalPrice, location, resalePrice, YearOfuse, sellerName, email } = product;

    return (
        <div className="card lg:card-side bg-base-100 shadow-xl mx-auto">
            <figure><img src={img} alt="Album" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{bookName}</h2>
                <p>Original Price : {originalPrice}</p>
                <p>Sale Price : {resalePrice}</p>
                <p>Used Year : {YearOfuse}</p>
                <p>Location : {location}</p>
                <p>{email}</p>
                <div className="flex">Sale by : {email === emaill ? (<p className="flex">{sellerName}<FaCheck className="text-blue-900"></FaCheck></p>) : sellerName}</div>
                <p>Post Date : {date}</p>
                <div className="card-actions justify-end">
                    <label
                        htmlFor="Booking-model"
                        className="btn btn-primary"
                        onClick={() => setProduct(product)}
                    > Book Now</label>
                    <label
                        htmlFor="Booking-model"
                        className="btn btn-primary"
                        onClick={() => handleReport(product)}
                    > Report to Admin</label>
                </div>
            </div>
        </div>
    )
}

export default CategoryProduct
