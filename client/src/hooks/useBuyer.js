import React, { useState, useEffect } from 'react'

const useBuyer = email => {

    const [isBuyer, setIsBuyer] = useState(false)
    const [isBuyerLoading, setIsBuyerLoading] = useState(true)
    useEffect(() => {
        if (email) {
            fetch(`http://localhost:5000/users/admin/${email}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data.isBuyer)
                    if (data.isBuyer) {
                        console.log(data.isBuyer)
                        setIsBuyer(data.isBuyer)
                        setIsBuyerLoading(false)
                    }

                })
                .catch(err => { console.log(err) })
        }
    }, [email])
    return [isBuyer, isBuyerLoading]
}

export default useBuyer
