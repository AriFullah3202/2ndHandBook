import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useSeller from '../hooks/useSeller';
import { AuthContext } from '../context/AuthProvider';
import Spinner from '../components/Spinner/Spinner';

const SellerRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    const [isSeller, isSellerLoading] = useSeller(user ?.email)
    const location = useLocation();
    console.log(isSeller)

    if (loading || isSellerLoading) {
        return <Spinner></Spinner>
    }

    if (user && isSeller) {
        console.log('comming Addmin route')
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default SellerRoute;