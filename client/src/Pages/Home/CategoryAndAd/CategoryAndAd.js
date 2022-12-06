import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';

const CategoryAndAd = () => {

    const [Catagory, setCatagory] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/bookCategory')
            .then(res => res.json())
            .then(data => {
                setCatagory(data)

            })
    }, [])

    return (
        <div>
            <h1 className="text-center text-3xl my-10">Books</h1>
            <div className="flex justify-center my-10">
                <ul className="menu menu-vertical lg:menu-horizontal rounded-box">
                    {
                        Catagory.map(cat => <li key={cat._id}><NavLink key={cat._id} to={`/category/${cat._id}`} className={({ isActive }) =>
                            isActive
                                ? 'w-56'
                                : 'w-56'
                        }>{cat.name}</NavLink></li>)
                    }


                </ul>
            </div>
        </div >
    )
}

export default CategoryAndAd
