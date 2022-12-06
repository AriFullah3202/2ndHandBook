import React, { useState, useEffect } from 'react'

const useSeller = email => {

    const [isSeller, setIsSeller] = useState(false)
    const [isSellerLoading, setIsSellerLoading] = useState(true)
    useEffect(() => {
        if (email) {
            fetch(`http://localhost:5000/users/admin/${email}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data.isSeller)
                    if (data.isSeller) {
                        setIsSeller(data.isSeller)
                        setIsSellerLoading(false)
                    }
                })
                .catch(err => { console.log(err) })
        }
    }, [email])
    return [isSeller, isSellerLoading]
}

export default useSeller
