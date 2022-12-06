import React, { useState, useEffect } from 'react'

const useAdmin = email => {

    const [isAdmin, setIsAdmin] = useState(false)
    const [isAdminLoading, setIsAdminLoading] = useState(true)
    useEffect(() => {
        if (email) {
            fetch(`http://localhost:5000/users/admin/${email}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    console.log(data.isAdmin)
                    if (data.isAdmin) {
                        setIsAdmin(data.isAdmin)
                        setIsAdminLoading(false)
                    }
                })
                .catch(err => { console.log(err) })
        }
    }, [email])
    return [isAdmin, isAdminLoading]
}

export default useAdmin
