import React, { useContext } from 'react'
import useTitle from '../../hooks/useTitle';
import { AuthContext } from '../../context/AuthProvider';

const Deshboard = () => {
    useTitle("Deshboard")
    const { user } = useContext(AuthContext)
    return (
        <div className="flex items-center h-screen p-16 bg-gray-100 text-gray-900">
            <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
                <div className="avatar">
                    <div className="w-24 mask mask-squircle">
                        <img src={user.photoURL} />
                    </div>
                </div>
                <div className='max-w-md text-center'>

                    <p className='text-2xl font-semibold md:text-3xl mb-8'>
                        {user ?.displayName}
                    </p>
                    <p className='text-2xl font-semibold md:text-3xl mb-8'>
                        {user ?.email}
                    </p>

                </div>
            </div>
        </div>
    )
}

export default Deshboard
